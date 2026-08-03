# API Integration & Documentation

This frontend uses the Next.js App Router and consumes the backend through:

- `BACKEND_API_URL` for server actions/server utilities.
- `NEXT_PUBLIC_BACKEND_API_URL` for client components.
- Authenticated requests use `accessToken` and `refreshToken` cookies. Most client-side protected requests pass `credentials: "include"`.

## Frontend Routes & API Integration

| Next.js Route | Component/Feature | Backend API Consumption |
| --- | --- | --- |
| `/` | Public home page | No backend request currently used |
| `/services` | Browse, search, filter, and paginate services | `GET /api/services?searchTerm=&category=&location=&rating=&priceMin=&priceMax=&page=&limit=` |
| `/services/[id]` | Service details, technician info, available slots, booking CTA | `GET /api/services/:id`, `GET /api/services/getTechnician/:serviceId`, `GET /api/availability/technician/:technicianId` |
| `/register` | Customer/technician registration form | `POST /api/auth/user/register` |
| `/login` | Login form and role-based redirect | `POST /api/auth/login` |
| `/profile` | Logged-in user profile | `GET /api/auth/user/me` |
| `/profile/updateprofile` | View and update logged-in user profile | `GET /api/auth/user/me`, `PATCH /api/auth/user/me` |
| `/payment-success` | Payment success page | Uses payment redirect result from payment provider/backend |
| `/payment-cancel` | Payment cancel page | Uses payment redirect result from payment provider/backend |
| `/customer-dashboard` | Customer dashboard overview and booking summary | `GET /api/bookings/my` |
| `/customer-dashboard/booking` | Create booking from selected service and availability slot | `POST /api/bookings` |
| `/customer-dashboard/mybooking` | Customer booking history and cancellation | `GET /api/bookings/my`, `PATCH /api/bookings/:bookingId/cancel` |
| `/customer-dashboard/payment/[bookingId]` | Start checkout for a booking | `POST /api/payments/checkout` |
| `/customer-dashboard/payment-history` | Customer payment history | `GET /api/payments/my` |
| `/customer-dashboard/review/[bookingId]` | Submit review for completed booking | `POST /api/reviews` |
| `/technician-dashboard` | Technician dashboard, bookings, reviews, and profile summary | `GET /api/auth/user/me`, `GET /api/reviews/technician/:technicianId`, `GET /api/bookings/technician` |
| `/technician-dashboard/category` | Select/list service categories before creating service | `GET /api/category` |
| `/technician-dashboard/createservice` | Create a technician service | `POST /api/services` |
| `/technician-dashboard/services` | Technician's own services and delete service | `GET /api/services/me`, `DELETE /api/services/:id` |
| `/technician-dashboard/booking` | Technician booking management | `GET /api/bookings/technician`, `PATCH /api/bookings/:bookingId/status` |
| `/technician-dashboard/availability` | Manage technician availability slots | `GET /api/availability/me`, `POST /api/availability`, `DELETE /api/availability/:id` |
| `/technician-dashboard/myfeedback` | Technician feedback/reviews | `GET /api/auth/user/me`, `GET /api/reviews/technician/:technicianId` |
| `/technician-dashboard/createtechnicianprofile` | Create technician profile | `POST /api/technician/profile` |
| `/admin-dashboard` | Admin overview/user statistics | `GET /api/admin/users` |
| `/admin-dashboard/users` | Admin user listing, details, and status management | `GET /api/admin/users`, `GET /api/admin/users/:id`, `PATCH /api/admin/users/:id/status` |
| `/admin-dashboard/bookings` | Admin booking management/listing | `GET /api/bookings` |
| `/admin-dashboard/categories` | Admin category listing and deletion | `GET /api/category`, `DELETE /api/category/:id` |
| `/admin-dashboard/createnewcategory` | Create service category | `POST /api/category` |
| `/admin-dashboard/updatecategory/[id]` | Edit service category | `GET /api/category/:id`, `PATCH /api/category/:id` |

## Shared Backend Services

| File/Helper | Purpose | Backend API Consumption |
| --- | --- | --- |
| `service/getMe.ts` | Server-side current user lookup | `GET /api/auth/user/me` |
| `service/refreshToken.ts` | Refresh expired access token | `POST /api/auth/refresh-token` |
| `app/(auth)/_actions/authActions.ts` | Login server action and auth cookie setup | `POST /api/auth/login` |
| `app/(dashboard)/_actions/serviceAction.ts` | Technician service actions | `GET /api/services/me`, `DELETE /api/services/:id` |

## Notes

- Protected routes depend on valid `accessToken`/`refreshToken` cookies.
- Server-side calls read `BACKEND_API_URL`; client components read `NEXT_PUBLIC_BACKEND_API_URL`.
- Payment checkout expects the backend to return `data.checkoutUrl`, then the frontend redirects the browser to that URL.
