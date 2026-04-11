# Features

Role-based feature modules for the POS application.

## Architecture

This project follows a **role-based feature architecture** where each user role has its own isolated feature set.

## Features Structure

```
features/
├── auth/           # 🔐 Authentication (shared across all roles)
│   ├── LoginPage
│   ├── RegisPage
│   └── ResetPassPage
│
├── cashier/        # 💰 Cashier operations (POS terminal)
│   ├── CashierDashboardPage
│   ├── components/ (Header, Sidebar, OrderPanel, etc.)
│   └── data/ (mockMenus, mockCategories)
│
├── admin/          # 👨‍💼 Admin management (back-office)
│   ├── AdminDashboardPage
│   ├── ReportsPage
│   ├── MenuManagementPage
│   └── UserManagementPage
│
└── splashscreen/   # 🎬 App splash screen
```

## Role-Based Routing

| Role | Route | Description |
|------|-------|-------------|
| Public | `/login`, `/register` | Authentication pages |
| Cashier | `/dashboard` | POS operations |
| Admin | `/admin/dashboard` | Admin dashboard |
| Admin | `/admin/reports` | Sales reports |
| Admin | `/admin/menus` | Menu management |
| Admin | `/admin/users` | User management |

## Adding New Features

### For New Role (e.g., Manager):
1. Create folder: `features/manager/`
2. Add structure: `components/`, `pages/`, `data/`, `hooks/`
3. Create `index.js` for exports
4. Add routes in `App.jsx`

### For New Component:
1. Place in appropriate feature folder
2. Export from feature's `index.js`
3. Import using: `import { ComponentName } from "@/features/featureName"`

## Benefits

✅ **Separation of Concerns** - Each role has isolated features
✅ **Scalability** - Easy to add new roles/features
✅ **Maintainability** - Changes in one role don't affect others
✅ **Team Collaboration** - Teams can work in parallel
✅ **Code Organization** - Clear structure and naming

## Conventions

- Use named exports in `index.js`
- Keep components specific to their role
- Share common components in `shared/` folder
- Use consistent naming: `RoleComponentName` (e.g., `CashierHeader`, `AdminSidebar`)
