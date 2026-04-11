# Auth Feature

Authentication-related pages and components for all user roles.

## Structure
```
auth/
├── components/     # Reusable auth components (LoginForm, RegisterForm, etc.)
├── pages/          # Auth pages (Login, Register, ResetPassword)
├── hooks/          # Auth hooks (useAuth, useSession)
└── index.js        # Feature exports
```

## Pages
- `LoginPage` - User login page
- `RegisPage` - User registration page
- `ResetPassPage` - Password reset page

## Usage
```jsx
import { LoginPage, RegisPage } from "@/features/auth";
```
