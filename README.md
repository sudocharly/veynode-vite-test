# Veynode static check

A static React app for checking that a Veynode deploy serves HTML, CSS, JavaScript, client-side routes, and files from `public/`.

```bash
npm install
npm run dev
```

The production build is written to `dist`:

```bash
npm run build
npm run preview
```

Deploy the `dist` folder. For `/routes` and `/assets` to survive a refresh, the host should serve `index.html` when a path does not match a real file. The Routes page in the app is the place to confirm that.

Vite’s build and preview scripts follow the [static deploy guide](https://vite.dev/guide/static-deploy). Routing uses React Router’s declarative library mode on that Vite build: a `BrowserRouter` around the app, as described in the package docs at `docs/start/declarative/installation.md`.
