# DivingApplication

## Om projektet

DivingApplication är en React- och TypeScript-baserad frontend byggd med Vite, kopplad till ett ASP.NET Core 8-API i samma repo.

Frontend visar en prototyp för dykning med startsida, karta, loggbok, forum, profil och autentisering.

## Förutsättningar

Installera följande innan du kör projektet:

1. Node.js 20 eller senare
2. npm
3. .NET 8 SDK

Kontrollera vilka versioner du har med:

```bash
node -v
npm -v
dotnet --version
```

## Installera beroenden

I projektroten:

```bash
npm install
```

För backend kan du också köra:

```bash
cd api
dotnet restore
```

## För att starta applikationen

### Frontend

```bash
npm run dev
```

Vite kör normalt på `http://localhost:5173`.

### Backend

```bash
npm run dev:api
```

API:t körs då på `http://localhost:5000`.

### Frontend och backend samtidigt

```bash
npm run dev:full
```

Detta startar backend i en separat process och frontend i samma terminalflöde.

## Bygga och testa

### Bygga frontend

```bash
npm run build
```

TypeScript-kompilering och Vite-build.

### Förhandsgranska byggd frontend

```bash
npm run preview
```

startar en lokal preview av `dist`.

### Kör färdig build med serve

```bash
npm run start
```

Detta installerar `serve` globalt och serverar `dist`.

## Backend

Backend finns i mappen `api/` och använder SQLite med databasen `diving.db`.

Vid start skapas databasen automatiskt via `EnsureCreatedAsync`.

## REST API

Frontend kommunicerar med backend via följande endpoints.

### POST /api/auth/register

Skapar en ny användare.
Response innehåller JWT-token och användardata.

### POST /api/auth/login

Loggar in en användare.
Response innehåller samma struktur som register.

### GET /api/auth/me

Returnerar aktuell inloggad användare baserat på JWT-token.
Används vid appstart för att återställa auth-state.

### GET /api/profile/me

Returnerar profilsidan för den inloggade användaren.

## Hur frontend använder API:t

Frontend har en tydlig uppdelning mellan UI och API-lager:

1. [src/api/auth.ts](src/api/auth.ts) hanterar inloggning, registrering och hämtning av aktuell användare.
2. [src/api/profile.ts](src/api/profile.ts) hanterar profilhämtning.
3. [src/lib/auth.tsx](src/lib/auth.tsx) håller ett gemensamt auth-tillstånd via Context API.
4. [src/pages/Profil.tsx](src/pages/Profil.tsx) visar profildata från API:t.

## Swagger och utveckling

Swagger är tillgängligt när API:t körs i utvecklingsläge.

Vanlig adress:

```text
http://localhost:5000/swagger
```

## problem

1. Om `vite` inte hittars elr körs, kör `npm install` i projektroten.
2. Om backend inte svarar, kontrollera att `npm run dev:api` körs.
3. Om autentisering misslyckas, kolla att backend körs på `http://localhost:5000` och att JWT-token finns sparad i webbläsaren.

## Testa lokalt

1. Starta backend med `npm run dev:api`.
2. Starta frontend med `npm run dev`.
3. Gå igenom hem, karta, loggbok, forum, login och profil.
4. Testa registrering, inloggning och profilhämtning för att verifiera REST-kommunikationen.

## Data och statehantering

I det här projektet har jag valt att använda Reacts Context-API för den avancerade statehanteringen. Valet grundar sig i att applikationen i dagsläget är måttligt komplex och framförallt behöver dela autentiserings- och profilstatus globalt över många komponenter (t.ex. `BottomNav`, `Profil`, och flera sidor). Context tillsammans med hooks ger en lättviktig, typesäker och dependency-fri lösning som minskar boilerplate jämfört med att införa ett externt bibliotek som Redux när behoven fortfarande är begränsade.

Context används främst i `src/lib/auth.tsx` där `AuthProvider` kapslar in inloggningslogik, token-hantering och en `useAuth()`-hook. Detta gör att komponenter kan läsa `user`, `isAuthenticated` och anropa `login`/`logout` utan att ha props-drill. Om applikationen växer till stora, ofta ändrade globala states kan en migration till Redux eller Zustand övervägas, men Context ger idag bästa balans mellan enkelhet och funktionalitet.

## Min återanvändningsbara komponent

Den komponent jag prioriterat att göra generellt återanvändbar är `ImageWithFallback` (`src/Components/figma/ImageWithFallback.tsx`). Syftet är enkelt: visa en bild men hantera laddningsfel snyggt och på ett enhetligt sätt. Komponenten ansvarar för att visa en fallback-bild (eller placeholder) om originalbilden inte kan laddas, och exponerar vanliga `img`-props via `ImgHTMLAttributes` så att den kan användas som en drop-in-ersättning för `<img>`.

Designen håller beroenden minimala — inga externa paket krävs — och komponenten använder inga app-specifika hooks utöver vanliga props och CSS-klasser. Den dokumenteras i koden genom tydliga props och kommentarer och är därför lätt att flytta till ett annat projekt: importera filen, ta med relevanta CSS-klasser och använd `src`, `alt`, `className` som vanligt. Den är återanvändbar både visuellt (fallback-ikon, layout) och funktionellt (behåller originell `src` i `data-original-url` för debugging eller telemetry).

## Kodstruktur och felhantering

Anrop mot REST-API:et är avgränsade i `src/api/` och varje endpoint har sin egen modul (t.ex. `auth.ts`, `profile.ts`). Där ligger fetch-logiken, URL-konfigurationen (`API_BASE`), token-hantering (`saveToken`, `getStoredToken`, `logout`) och ett enhetligt sätt att parsa fel från servern. Denna separation håller UI-komponenterna rena: komponenterna anropar funktioner från `src/api/*` och hanterar bara render- och användarflödet.

Jämfört med tidigare inlämning är förbättringarna främst bättre felparsing och centralisering av token-hantering så att komponenter inte duplicerar logiken. Möjliga fel inkluderar nätverksfel (fetch-fel), 4xx/5xx-responser med olika JSON-strukturer och utgången JWT-token. Strategin är att låta API-funktionerna kasta välformade Error-meddelanden och att komponenter (eller `AuthProvider`) fångar dessa — visar användarvänliga felmeddelanden, loggar ut vid 401/ogiltig token och i vissa fall visa en retry-knapp eller navigera till inloggning.

## Min Error Boundry

Error Boundary-komponenten är designad som en klasskomponent enligt Reacts rekommendation (implementerar `getDerivedStateFromError` och `componentDidCatch`) och placeras runt appens routes på hög nivå så att render-fel i barnkomponenter fångas. UI:t som visas vid ett fångat fel är tydligt och vägledande: ett kort felmeddelande, ett knappval för att försöka ladda om sidan, länk tillbaka till startsidan och en möjlighet att kopiera/förbereda ett felmeddelande som kan skickas till support.

Syftet är att ge användaren en mjuk landning istället för en krasch: användaren kan först prova att ladda om (kan lösa transienta nätverks- eller resource-problem), gå tillbaka till en säker vy eller logga ut och in igen om felet är auth-relaterat. `componentDidCatch` loggar även felet till konsolen och är förberedd för att integreras med ett externt felrapporteringsverktyg (t.ex. Sentry) för framtida driftövervakning.
