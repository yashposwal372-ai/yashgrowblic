# Frontend Architecture

## Overview

Growblic is a frontend-only monorepo centered on a public Next.js application. Phase 2 establishes the application and folder boundaries without implementing the final visual design or product functionality.

```text
Browser
   |
   v
Next.js Web App (apps/web)
   |
   +-- App Router pages and layouts
   +-- Frontend components
   +-- Static content and constants
   +-- Frontend types and utilities
```

## Boundaries

- `src/app` owns routing, layouts, metadata, and global styles.
- `src/components` is divided into layout, section, UI, and animation concerns.
- `src/data` will contain static website content.
- `src/constants` will contain site-wide frontend constants.
- `src/types` will contain frontend-only TypeScript types.
- `src/lib` will contain focused frontend utilities.

The repository does not implement APIs, databases, authentication backends, microservices, or enquiry storage. Any future form integration must use an explicitly selected external provider and must accurately communicate submission behavior.
