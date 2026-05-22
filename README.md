# DykApp

Detta projekt är en webbapplikation byggd med React, TypeScript och Vite.

README beskriver exakt hur du installerar beroenden, bygger projektet och öppnar applikationen i webbläsaren.

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

## Länk till Hemsida

https://stingray-app-wf96o.ondigitalocean.app/