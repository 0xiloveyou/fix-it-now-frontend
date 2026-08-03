/*


app
├── (paymentGroup)
│   ├── payment-cancel            
│   |    ├── page.tsx          
│   ├── payment-success            
│   |    ├── page.tsx          
|
├── (public)
│   ├── page.tsx                  // Home
│   ├── layout.tsx                  
│   ├── services                 
│   |     ├── page.tsx
│   |     ├── [id]
│   ├── contact
│   |    ├── page.tsx
│   |
│   ├── about
│   |    ├── page.tsx
│   |
│   ├── learn-more
│   |    ├── page.tsx
│   |
│   ├── profile
│   |    ├── page.tsx
│        |updateprofile
|           ├── page.tsx
├── (auth)
|   ├── _actions
|   |    ├── authAction.ts
|   ├── _components
|   |    ├──
|   ├── login
|   |    ├── page.tsx
|   ├── register
|   |    ├── page.tsx
|   └── layout.tsx
│
├── (dashboard)
│   ├── admin-dashboard 
│   |    ├── createnewcategory
│   |    |    ├── page.tsx
│   |    ├── categories
│   |    |   ├── page.tsx
│   |    ├── users
│   |    |   ├── page.tsx
│   |    |
│   |    ├── bookings
│   |    |   ├── page.tsx
│   |    |
│   |    |
│   |    ├── page.tsx 
│   |  
│   ├── customer-dashboard
│   |   ├── page.tsx
│   |   ├── layout.tsx
│   |   ├── booking
│   |   |     ├── page.tsx
│   |   ├── mybooking
│   |   |     ├── page.tsx
│   |   |    
│   |   ├── review
│   |   |     ├── page.tsx
│   |   |    
│   |   ├── payment-history
│   |   |     ├── page.tsx
│   |   |    
│   |   ├── payment
│   |   |     ├── [bookingId]
│   |   |          ├── page.tsx
│   ├── technician-dashboard
│       ├── page.tsx
│       ├── layout.tsx
│       ├── services
│       |    ├── page.tsx
│       |    ├──
│       ├── category
|       |    ├──page.tsx
|       |    
│       ├── createservice
|       |    ├──page.tsx
|       |    
│       ├── booking
│       |   ├── page.tsx
│       |
│       ├── availability
│       |   ├── page.tsx
│       |
│       ├── myfeedback
│       |   ├── page.tsx
│       |
│       ├── createtechnicianprofile
│       |   ├── page.tsx
│       |
├── loading.tsx
├── error.tsx
├── layout.tsx
├── not-found.tsx



root
│
├── component
│   ├── shared
│   |    ├── Navbar
│   |    ├── Footer
│   |
│   ├── Ui
|   |    ├── button.tsx
|   |    ├── card.tsx
│   ├── utils
|   |    ├── jwt.ts
|
├── service
|    ├── getme.ts
|    ├── logout.ts
|    ├── refreshToken.ts
|
├── proxy.ts



*/