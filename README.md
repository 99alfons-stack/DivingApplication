# DykApp

Detta är frontend-repot för DykApp, byggt med React, TypeScript och Vite.

Backend-repot/API-dokumentationen finns i [api/README.md](api/README.md).

Om du har två separata repos i din miljö ska den här README:n länka till backend-repot och backend-README:n ska länka tillbaka hit.

## Förutsattningar

Innan du startar, se till att du har:

1. Node.js installerat, rekommenderat version 20 eller senare.
2. npm installerat (följer normalt med Node.js).

Kontrollera versioner:

1. node -v
2. npm -v

## Installera projektet

Kör i projektroten:

1. npm install

Detta installerar alla beroenden i package.json.

## Starta i utvecklingsläge

Starta utvecklingsservern:

1. npm run dev

När servern är igång, öppna adressen som skrivs ut i terminalen.
Standard för Vite är vanligtvis:

1. http://localhost:5173

Frontend anropar backend på:

1. http://localhost:5000/api
2. https://localhost:5001/api

För lokal utveckling används normalt `http://localhost:5000`.

## Bygga för produktion

Skapa en produktionsbuild:

1. npm run build

Detta gör två saker:

1. TypeScript-kompilering med projektets tsconfig.
2. Vite-build som skapar filer i dist-mappen.

Efter lyckad build finns den färdiga webbappen i dist.

## Förhandsgranska produktionsbuild lokalt

Starta Vites preview-server:

1. npm run preview

Öppna adressen som visas i terminalen, vanligtvis:

1. http://localhost:4173

Detta är det rekommenderade sättet att testa den byggda versionen lokalt.

## Alternativt sätt att servra dist

Projektet innehåller även scriptet:

1. npm run start

Detta installerar serve globalt och servera dist-mappen.
Om du inte vill installera globala paket, använd hellre npm run preview.

## Vanliga problem

1. Om npm install misslyckas:
Kontrollera att du har en modern Node.js-version och försök igen.

2. Om porten redan används:
Stoppa processen som använder porten eller starta om kommandot så Vite valjer en annan port.

3. Om builden misslyckas:
Kör npm run build igen och lös eventuella TypeScript- eller importfel som skrivs ut i terminalen.

## Hur frontend använder API:t

Frontend hämtar data från minst två GET-endpoints:

1. [src/lib/auth.tsx](src/lib/auth.tsx) hämtar aktuell inloggad användare via `GET /api/auth/me`.
2. [src/pages/Profil.tsx](src/pages/Profil.tsx) hämtar profildata via `GET /api/profile/me`.

Frontend skickar också data till backend via POST:

1. [src/api/auth.ts](src/api/auth.ts) anropar `POST /api/auth/register`.
2. [src/api/auth.ts](src/api/auth.ts) anropar `POST /api/auth/login`.

API:t returnerar JWT-token som sparas lokalt och används som `Authorization: Bearer ...` i efterföljande GET-anrop.

## Länk till Hemsida

https://stingray-app-wf96o.ondigitalocean.app/

## Koppling till backend

Se backenddokumentationen i [api/README.md](api/README.md) för endpoints, portar och databasinformation.