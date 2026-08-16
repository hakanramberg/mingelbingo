const jsonHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function authorized(request, env) {
  const supplied = request.headers.get("x-admin-password") || "";
  return Boolean(env.ADMIN_PASSWORD) && supplied === env.ADMIN_PASSWORD;
}

async function readConfig(env, includeAnswers = false) {
  const [promptResult, settingsResult] = await Promise.all([
    env.DB.prepare("SELECT id, position, statement, answer_name FROM prompts ORDER BY position, id").all(),
    env.DB.prepare("SELECT key, value FROM settings WHERE key IN ('columns', 'revision')").all()
  ]);
  const settings = Object.fromEntries(settingsResult.results.map(row => [row.key, row.value]));
  return {
    columns: Number(settings.columns) || 4,
    revision: Number(settings.revision) || 1,
    prompts: promptResult.results.map(row => ({
      id: row.id,
      statement: row.statement,
      ...(includeAnswers ? { answerName: row.answer_name } : {})
    }))
  };
}

async function updateConfig(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Ogiltig data." }, 400);
  }
  const columns = Number(body.columns);
  const prompts = Array.isArray(body.prompts) ? body.prompts : [];
  if (!Number.isInteger(columns) || columns < 2 || columns > 6) {
    return json({ error: "Antal rutor per rad måste vara mellan 2 och 6." }, 400);
  }
  if (prompts.length < 1 || prompts.length > 100) {
    return json({ error: "Listan måste innehålla mellan 1 och 100 påståenden." }, 400);
  }
  const clean = prompts.map((item, position) => ({
    position,
    statement: String(item.statement || "").trim(),
    answerName: String(item.answerName || "").trim()
  }));
  if (clean.some(item => !item.statement || item.statement.length > 240 || item.answerName.length > 100)) {
    return json({ error: "Kontrollera att alla påståenden är ifyllda och inte för långa." }, 400);
  }
  const statements = [
    env.DB.prepare("DELETE FROM prompts"),
    ...clean.map(item => env.DB.prepare("INSERT INTO prompts (position, statement, answer_name) VALUES (?, ?, ?)").bind(item.position, item.statement, item.answerName)),
    env.DB.prepare("INSERT INTO settings (key, value) VALUES ('columns', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(String(columns)),
    env.DB.prepare("INSERT INTO settings (key, value) VALUES ('revision', '1') ON CONFLICT(key) DO UPDATE SET value = CAST(value AS INTEGER) + 1")
  ];
  await env.DB.batch(statements);
  return json(await readConfig(env, true));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/config" && request.method === "GET") {
      return json(await readConfig(env, false));
    }
    if (url.pathname === "/api/admin/config") {
      if (!authorized(request, env)) return json({ error: "Fel lösenord." }, 401);
      if (request.method === "GET") return json(await readConfig(env, true));
      if (request.method === "PUT") return updateConfig(request, env);
      return json({ error: "Metoden stöds inte." }, 405);
    }
    return env.ASSETS.fetch(request);
  }
};
