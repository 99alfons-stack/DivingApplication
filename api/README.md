# DivingApplication API

Detta är backend-repot/API:t för DykApp, byggt med ASP.NET Core 8.

Frontend-dokumentationen finns i [../README.md](../README.md).

## Setup

1. **Installera .NET 8**  
   Hämta från https://dotnet.microsoft.com/download

2. **Installera beroenden**
   ```bash
   cd api
   dotnet restore
   ```

3. **Skapa databas**
   ```bash
   dotnet ef database update
   ```

4. **Starta servern**
   ```bash
  dotnet run --urls http://localhost:5000
   ```

  API kör på `http://localhost:5000` vid lokal utveckling.
  Om du kör HTTPS kan den också exponeras på `https://localhost:5001`.

## Portar och databas

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Alternativ backend-HTTPS: `https://localhost:5001`
- Databas: SQLite-fil `diving.db` i API-repot, ingen separat databasport används

## API Endpoints

### GET /api/auth/me
Returnerar den inloggade användaren baserat på JWT-token.

**Används av frontend-komponent:**
- [src/lib/auth.tsx](../src/lib/auth.tsx) för att synka inloggad användare vid appstart

### GET /api/profile/me
Returnerar profilinformation för den inloggade användaren.

**Används av frontend-komponent:**
- [src/pages/Profil.tsx](../src/pages/Profil.tsx) för att visa rätt användare på profilsidan

### POST /api/auth/register
Registrera ny användare.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /api/auth/login
Logga in.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** (samma som register)

## Konfiguration

Ändra `appsettings.json` för:
- JWT Secret (ändra för produktion!)
- Databaskonfiguration
- CORS-inställningar

## Hur API:t hänger ihop med frontend

Frontend skickar `POST /api/auth/register` och `POST /api/auth/login` via [src/api/auth.ts](../src/api/auth.ts).
Svaret innehåller en JWT-token och användardata som sparas lokalt och används i efterföljande GET-anrop.

Frontend hämtar också data med GET från två komponenter:

1. [src/lib/auth.tsx](../src/lib/auth.tsx) hämtar aktuell användare via `GET /api/auth/me`.
2. [src/pages/Profil.tsx](../src/pages/Profil.tsx) hämtar profil via `GET /api/profile/me`.

Om du har backend och frontend i separata repos ska den här README:n länka tillbaka till frontend-repot, och frontend-README:n ska länka hit.

## Utveckling

- Swagger UI: `https://localhost:5001/swagger`
- Entity Framework migrations: `dotnet ef migrations add MigrationName`
