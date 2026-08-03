# Fix It Now Frontend

Fix It Now is a service-booking frontend built with Next.js App Router. It supports public service browsing, customer bookings and payments, technician service/availability management, and admin management for users, bookings, and categories.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn-style UI components
- React Hook Form
- Zod
- Sonner
- JSON Web Token based auth flow

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create an environment file:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Server-side only
BACKEND_API_URL=your_backend_base_url
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

# Client and server
NEXT_PUBLIC_BACKEND_API_URL=your_backend_base_url
```

Run the development server:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Main Features

- Public home, about, contact, learn-more, and service browsing pages.
- Service filtering by search, category, location, rating, and price range.
- Service details with technician and availability information.
- Customer registration, login, profile, booking, payment, and review flows.
- Technician dashboard for services, categories, bookings, availability, profile creation, and feedback.
- Admin dashboard for users, bookings, categories, category creation, and category updates.
- Cookie-based authentication using `accessToken` and `refreshToken`.

## Project Routes & File Structure

This project uses route groups such as `(public)`, `(auth)`, `(dashboard)`, and `(paymentGroup)`. These group folders organize the code but do not appear in the browser URL.

```txt
app/
|-- (public)/
|   |-- page.tsx                              -> /
|   |-- layout.tsx
|   |-- services/
|   |   |-- page.tsx                          -> /services
|   |   `-- [id]/
|   |       `-- page.tsx                      -> /services/[id]
|   |-- about/
|   |   `-- page.tsx                          -> /about
|   |-- contact/
|   |   `-- page.tsx                          -> /contact
|   |-- learn-more/
|   |   `-- page.tsx                          -> /learn-more
|   `-- profile/
|       |-- page.tsx                          -> /profile
|       `-- updateprofile/
|           `-- page.tsx                      -> /profile/updateprofile
|
|-- (auth)/
|   |-- layout.tsx
|   |-- _actions/
|   |   `-- authActions.ts
|   |-- login/
|   |   `-- page.tsx                          -> /login
|   `-- register/
|       `-- page.tsx                          -> /register
|
|-- (dashboard)/
|   |-- _actions/
|   |   `-- serviceAction.ts
|   |-- admin-dashboard/
|   |   |-- layout.tsx
|   |   |-- page.tsx                          -> /admin-dashboard
|   |   |-- users/
|   |   |   `-- page.tsx                      -> /admin-dashboard/users
|   |   |-- bookings/
|   |   |   `-- page.tsx                      -> /admin-dashboard/bookings
|   |   |-- categories/
|   |   |   `-- page.tsx                      -> /admin-dashboard/categories
|   |   |-- createnewcategory/
|   |   |   `-- page.tsx                      -> /admin-dashboard/createnewcategory
|   |   `-- updatecategory/
|   |       `-- [id]/
|   |           `-- page.tsx                  -> /admin-dashboard/updatecategory/[id]
|   |
|   |-- customer-dashboard/
|   |   |-- layout.tsx
|   |   |-- page.tsx                          -> /customer-dashboard
|   |   |-- booking/
|   |   |   `-- page.tsx                      -> /customer-dashboard/booking
|   |   |-- mybooking/
|   |   |   `-- page.tsx                      -> /customer-dashboard/mybooking
|   |   |-- payment/
|   |   |   `-- [bookingId]/
|   |   |       `-- page.tsx                  -> /customer-dashboard/payment/[bookingId]
|   |   |-- payment-history/
|   |   |   `-- page.tsx                      -> /customer-dashboard/payment-history
|   |   `-- review/
|   |       `-- [bookingId]/
|   |           `-- page.tsx                  -> /customer-dashboard/review/[bookingId]
|   |
|   `-- technician-dashboard/
|       |-- layout.tsx
|       |-- page.tsx                          -> /technician-dashboard
|       |-- services/
|       |   `-- page.tsx                      -> /technician-dashboard/services
|       |-- category/
|       |   `-- page.tsx                      -> /technician-dashboard/category
|       |-- createservice/
|       |   `-- page.tsx                      -> /technician-dashboard/createservice
|       |-- booking/
|       |   `-- page.tsx                      -> /technician-dashboard/booking
|       |-- availability/
|       |   `-- page.tsx                      -> /technician-dashboard/availability
|       |-- myfeedback/
|       |   `-- page.tsx                      -> /technician-dashboard/myfeedback
|       `-- createtechnicianprofile/
|           `-- page.tsx                      -> /technician-dashboard/createtechnicianprofile
|
|-- (paymentGroup)/
|   |-- payment-success/
|   |   `-- page.tsx                          -> /payment-success
|   `-- payment-cancel/
|       `-- page.tsx                          -> /payment-cancel
|
|-- layout.tsx
|-- loading.tsx
|-- error.tsx
|-- not-found.tsx
|-- globals.css
`-- favicon.ico
```

## Root Structure

```txt
.
|-- app/                                      Next.js app routes and layouts
|-- components/
|   |-- shared/                               Navbar and footer
|   `-- ui/                                   Reusable UI components
|-- lib/                                      Shared helpers and types
|-- public/                                   Static assets
|-- service/                                  Server-side auth/service helpers
|-- utils/                                    JWT utilities
|-- API_INTEGRATION.md                        Frontend route to backend endpoint map
|-- current.file.structure.ts                 Project route/file structure notes
|-- proxy.ts                                  Auth/protected route middleware logic
|-- next.config.ts
|-- package.json
|-- pnpm-lock.yaml
`-- tsconfig.json
```

## API Documentation

The full route-to-endpoint mapping is documented in:

```txt
API_INTEGRATION.md
```

Important API behavior:

- Server actions use `BACKEND_API_URL`.
- Client components use `NEXT_PUBLIC_BACKEND_API_URL`.
- Protected frontend requests use auth cookies and often include `credentials: "include"`.
- Login stores `accessToken` and `refreshToken` as HTTP-only cookies.
- Payment checkout redirects to the backend-provided `data.checkoutUrl`.

## Authentication & Role Routing

After login, users are redirected by role:

- `CUSTOMER` -> `/customer-dashboard`
- `TECHNICIAN` -> `/technician-dashboard`
- `ADMIN` -> `/admin-dashboard`

The `proxy.ts` file handles route protection and token refresh behavior.

## Development Notes

- Keep new protected requests consistent with the existing cookie-based auth flow.
- Add new backend endpoint mappings to `API_INTEGRATION.md` whenever a route or feature consumes a new API.
- Keep `current.file.structure.ts` updated when adding or moving major routes.
