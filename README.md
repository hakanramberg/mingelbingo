# Mingelbingo

Mingelbingo är en Cloudflare Worker med statiska sidor och en gemensam D1-databas.

## Funktioner

- Deltagarbrickan hämtar påståenden centralt och kontrollerar uppdateringar var 30:e sekund.
- `/admin/` låter arrangören lägga till, ta bort och ordna påståenden.
- Varje påstående kan kopplas till ett rätt namn som bara visas i admin.
- Administratörslösenordet lagras som Worker-hemligheten `ADMIN_PASSWORD`.

## Driftsättning

1. Skapa en D1-databas och ersätt `REPLACE_WITH_D1_DATABASE_ID` i `wrangler.jsonc`.
2. Kör migreringen i `migrations/0001_initial.sql`.
3. Lägg in `ADMIN_PASSWORD` som en Worker-hemlighet.
4. Kör `npm install` och `npm run deploy`.
