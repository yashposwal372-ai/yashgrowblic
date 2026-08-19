# Growblic Software Company

This repository contains the frontend website for Growblic Software Company. It is an npm-workspaces monorepo powered by Next.js, React, TypeScript, Tailwind CSS, and Turborepo.

## Project Structure

- `apps/web` contains the public Growblic website.
- `packages/ui` is reserved for future reusable frontend components.
- `infrastructure/docker` is reserved for future frontend container assets.
- `docs` contains frontend architecture documentation.

## Commands

Run commands from the repository root:

```sh
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Project Status

**Phase 2 — Frontend foundation**

The Next.js frontend foundation is initialized. The complete Growblic design system, production page sections, animations, forms, and external integrations will be added in later phases.

This is a frontend-only project. It does not contain backend APIs, database code, authentication services, or server-side enquiry storage.
