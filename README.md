
# ohmyfork

Minimal portfolio & dev showcase

## Preview

![Demo Preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9pphhianf3zo5jvpzpi3.png)

---

## Quick Start

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
bun install
bun run dev
```

---

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

---

## Deployment

### Self-Hosting (Docker + Caddy)

```sh
make docker-build
make docker-run
# App available at http://localhost
```

### Static Hosting

Build and deploy the `dist/` folder to:

- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

```sh
bun run build
# deploy dist/ folder
```

---

## Useful Commands

See the `Makefile` for build, run, clean, and more.
