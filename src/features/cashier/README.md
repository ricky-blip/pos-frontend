# Cashier Feature

POS cashier operations and order management.

## Structure
```
cashier/
├── components/     # Cashier UI components (Header, Sidebar, OrderPanel, etc.)
├── pages/          # Cashier pages (Dashboard)
├── data/           # Mock data (menus, categories)
├── hooks/          # Cashier hooks (useCart, useOrderType)
└── index.js        # Feature exports
```

## Pages
- `CashierDashboardPage` - Main POS dashboard for cashiers
- `SalesReportPage` - Sales report with statistics and filtering
- `SettingsPage` - User settings (Account, Password, Appearance)

## Components
- `CashierHeader` - Top navigation bar
- `CashierSidebar` - Side navigation
- `OrderPanel` - Order management panel
- `MenuSection` - Menu display section
- `CategoryTabs` - Category filter tabs
- `TransactionSuccessModal` - Success modal after payment
- `DetailMenuModal` - Menu detail modal with notes
- `OrderArchiveModal` - Order history modal
- `CategorySalesModal` - Category sales breakdown modal
- `TransactionDetailModal` - Transaction detail modal

## Usage
```jsx
import { CashierDashboardPage, CashierHeader } from "@/features/cashier";
```
