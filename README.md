# Mingelbingo

Mingelbingo är en Cloudflare Worker med statiska sidor och en gemensam D1-databas.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hakanramberg/mingelbingo)

## Funktioner

- Deltagarbrickan hämtar påståenden centralt och kontrollerar uppdateringar var 30:e sekund.
- `/admin/` låter arrangören lägga till, ta bort och ordna påståenden.
- Varje påstående kan kopplas till ett rätt namn som bara visas i admin.
- Administratörslösenordet lagras som Worker-hemligheten `ADMIN_PASSWORD`.

## Driftsättning

Klicka på **Deploy to Cloudflare** ovan. Cloudflare skapar D1-databasen automatiskt och ber dig välja `ADMIN_PASSWORD` innan publicering. Databasmigreringen körs som en del av distributionen.

För manuell distribution kör du `npm install` och `npm run deploy`. Lösenordet ska lagras som Worker-hemligheten `ADMIN_PASSWORD`, aldrig i källkoden.
