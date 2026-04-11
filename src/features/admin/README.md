# Admin Feature

Admin dashboard and management features.

## Structure
```
admin/
├── components/     # Admin UI components (StatsCard, Charts, Tables, etc.)
├── pages/          # Admin pages (Dashboard, Reports, MenuManagement, UserManagement)
├── data/           # Admin data (analytics, user lists)
├── hooks/          # Admin hooks (useAnalytics, useInventory)
└── index.js        # Feature exports
```

## Pages
- `AdminDashboardPage` - Main admin dashboard with analytics
- `ReportsPage` - Sales and analytics reports
- `MenuManagementPage` - CRUD operations for menu items
- `UserManagementPage` - Manage cashiers and admin users

## Future Components
- `AdminHeader` - Top navigation for admin
- `AdminSidebar` - Side navigation for admin
- `StatsCard` - Analytics stats display
- `ChartComponent` - Data visualization charts
- `UserTable` - User management table
- `MenuTable` - Menu management table

## Usage
```jsx
import { AdminDashboardPage, ReportsPage } from "@/features/admin";
```
