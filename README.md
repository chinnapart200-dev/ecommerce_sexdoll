# Ecommerce Sexdoll

Ecommerce storefront built with `Next.js`, `React`, `TypeScript`, `Tailwind CSS`, and `MySQL` via `XAMPP`.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- MySQL
- XAMPP for local database development

## Project Structure

```txt
src/
  app/
  components/
  lib/
  types/
database/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
.env.local
```

Start the development server:

```bash
npm run dev
```

Open the app at:

```txt
http://localhost:3000
```

## Environment Variables

Example `.env.local` values:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_sexdoll
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Database Setup

1. Open XAMPP and start `MySQL`.
2. Create a database named `ecommerce_sexdoll`.
3. Import `database/schema.sql`.
4. Optionally import `database/seed.sql` for sample data.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Notes

- Product and cart data are wired to MySQL routes in `src/app/api`.
- SEO metadata, `robots.txt`, and `sitemap.xml` are included.
- The homepage is currently styled to match the WOODMART-inspired design direction.
