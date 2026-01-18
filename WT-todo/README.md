# WT-todo (Frontend)

Vue 3 + Vite Frontend fuer die WT-Todo App.

## Setup
```sh
npm install
```

## Environment

Die App erwartet eine API-Base-URL ueber:
- `VITE_API_URL` (z.B. `http://localhost:8080` oder deine Render-Backend-URL)

Beispiel `.env.local`:
```env
VITE_API_URL=http://localhost:8080
```

## Development
```sh
npm run dev
```

## Build
```sh
npm run build
```

## Login / Register
- `/login`
- `/register`

Nach Login wird ein JWT im LocalStorage gespeichert und automatisch als `Authorization: Bearer <jwt>` an das Backend gesendet.

## Continuous Deployment (Render Auto Deploy)

Damit CD erfuellt ist (jeder Push auf `main` deployed automatisch):
1. Render Service oeffnen (**Frontend**)
2. **Settings**
3. **Deploys**
4. **Auto Deploy**: **On**
5. **Branch**: `main`
