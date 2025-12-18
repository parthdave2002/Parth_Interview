# React JS Practical Test - Admin Panel

## Project setup & installation ✅

1. Install dependencies:

   ```bash
   npm install
   ```


2. Start dev server:

   ```bash
   npm run dev
   ```

4. Tests & build:

   ```bash
   npm run build
   npm run preview
   ```

## Mock API instructions 🛠️

This project uses local mock data for pages and demonstrates how to wire up JSON Server or local service.

Option 1 - JSON Server (recommended for full CRUD):

1. Create `db.json` with `projects` and `estimations` arrays.
2. Run JSON Server on a different port:

```bash
npx json-server --watch db.json --port 3001
```

Then update `src/services/http.ts` to point to `http://localhost:3001`.

---
