# React JS Practical Test - Admin Panel

## Project setup & installation ✅

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

2. Add peer deps if needed (uuid, i18next, react-i18next):

   ```bash
   npm install uuid i18next react-i18next
   ```

3. Start dev server:

   ```bash
   npm run dev
   ```

4. Tests & build:

   ```bash
   npm run build
   npm run preview
   ```

---

## Folder structure 📂

```
src/
 ├── api/          # mock API configs, axios instances
 ├── assets/       # images, icons
 ├── components/   # reusable UI components
 ├── Pages/        # route-level pages
 ├── services/     # API service functions
 ├── store/        # redux slices & store config
 ├── utils/        # utility functions
 ├── locales/      # i18n translation files
 ├── App.tsx
 ├── main.tsx
```

---

## Features implemented ✅

- Routing using `react-router-dom` with protected admin routes (`/dashboard`, `/projects`, `/estimations`).
- Admin layout with sidebar and header including language switcher (i18n).
- Authentication pages: Login, Register, Forgot Password (mock behavior).
- Dashboard with summary cards and placeholder charts.
- Projects module (list + form scaffold for create/edit/delete).
- Estimations module with dynamic sections & items and real-time calculations (core feature).
- Redux slices skeletons exist and login already persists token via localStorage.
- Utilities: `calculateEstimationTotal`, `formatDate` and basic validation helper.
- i18n setup with English and Hindi locales.

---

## Mock API instructions 🛠️

This project uses local mock data for pages and demonstrates how to wire up JSON Server or local service.

Option 1 - JSON Server (recommended for full CRUD):

1. Create `db.json` with `projects` and `estimations` arrays.
2. Run JSON Server on a different port:

```bash
npx json-server --watch db.json --port 3001
```

Then update `src/services/http.ts` to point to `http://localhost:3001`.

Option 2 - Local Mock Service (used in the project skeleton):

- Use promise-wrapped static data in `src/api/api.tsx` or a new service file to simulate async calls.

---

## Design decisions & notes 💡

- Kept an incremental approach: scaffolded routes/pages and focused first on the Estimation dynamic form which is the core feature.
- Authentication is mocked and guarded by checking `localStorage.token` for simplicity.
- Used `react-i18next` for translation and a simple language switcher in the header.
- Strict TypeScript types should be added to all slices and API responses as a next step.

---

## Next steps / To finish (if you want to extend)

- Implement full Redux slices for projects & estimations (createAsyncThunk + mock API calls).
- Add JSON Server and wire async thunks to hit it.
- Add unit tests for calculation utilities.
- Improve UI and accessibility.
