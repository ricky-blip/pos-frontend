# POS Frontend - Project Structure

## Complete Folder Structure

```
pos-frontend/
├── src/
│   ├── features/                      # 🎯 Role-based feature modules
│   │   ├── auth/                      # 🔐 Authentication (Shared)
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisPage.jsx
│   │   │   │   └── ResetPassPage.jsx
│   │   │   ├── components/            # (Future: Auth forms, etc.)
│   │   │   ├── hooks/                 # (Future: useAuth, useSession)
│   │   │   ├── index.js               # ✅ Feature exports
│   │   │   └── README.md
│   │   │
│   │   ├── cashier/                   # 💰 Cashier Role
│   │   │   ├── pages/
│   │   │   │   └── CashierDashboardPage.jsx
│   │   │   ├── components/
│   │   │   │   ├── CashierHeader.jsx
│   │   │   │   ├── CashierSidebar.jsx
│   │   │   │   ├── OrderPanel.jsx
│   │   │   │   ├── CategoryTabs.jsx
│   │   │   │   ├── MenuSection.jsx
│   │   │   │   ├── MenuGrid.jsx
│   │   │   │   ├── MenuCard.jsx
│   │   │   │   ├── TransactionSuccessModal.jsx
│   │   │   │   ├── DetailMenuModal.jsx
│   │   │   │   ├── OrderArchiveModal.jsx
│   │   │   │   ├── OrderItemsList.jsx
│   │   │   │   ├── OrderHeader.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   ├── OrderTypeToggle.jsx
│   │   │   │   ├── PayBar.jsx
│   │   │   │   ├── PaymentSection.jsx
│   │   │   │   ├── CustomerForm.jsx
│   │   │   │   ├── EmptyOrderState.jsx
│   │   │   │   └── ItemNoteModal.jsx
│   │   │   ├── data/
│   │   │   │   ├── mockMenus.js
│   │   │   │   └── mockCategories.js
│   │   │   ├── hooks/                 # (Future: useCart, useOrderType)
│   │   │   ├── sales_report/          # (Empty - will be moved to admin)
│   │   │   ├── settings/              # (Empty - will be moved to admin)
│   │   │   ├── index.js               # ✅ Feature exports
│   │   │   └── README.md
│   │   │
│   │   ├── admin/                     # 👨‍ Admin Role
│   │   │   ├── pages/
│   │   │   │   ├── AdminDashboardPage.jsx
│   │   │   │   ├── ReportsPage.jsx
│   │   │   │   ├── MenuManagementPage.jsx
│   │   │   │   └── UserManagementPage.jsx
│   │   │   ├── components/            # (Future: AdminHeader, StatsCard, etc.)
│   │   │   ├── data/                  # (Future: analytics data)
│   │   │   ├── hooks/                 # (Future: useAnalytics, useInventory)
│   │   │   ├── index.js               # ✅ Feature exports
│   │   │   └── README.md
│   │   │
│   │   ├── splashscreen/              # 🎬 App Splash Screen
│   │   │   ├── SplashScreen.jsx
│   │   │   └── index.js
│   │   │
│   │   └── README.md                  # ✅ Features documentation
│   │
│   ├── shared/                        # 🔄 Shared across all features
│   │   ├── components/                # (Future: Button, Input, Modal)
│   │   └── utils/                     # (Future: helpers, formatters)
│   │
│   ├── router/                        # 🛣️ Route configuration
│   │   └── (Future: route guards, etc.)
│   │
│   ├── assets/                        # 🖼️ Images, fonts, etc.
│   ├── constants/                     # ⚙️ App constants
│   ├── styles/                        # 🎨 Global styles
│   ├── App.jsx                        # ✅ Main app with routes
│   └── main.jsx                       # ✅ Entry point
│
├── public/                            # 📦 Static assets
├── package.json
└── vite.config.js
```

## Role-Based Route Mapping

### 🔐 Public Routes (No Auth Required)
| Route | Component | Feature |
|-------|-----------|---------|
| `/` | SplashScreen | splashscreen |
| `/login` | LoginPage | auth |
| `/register` | RegisPage | auth |
| `/reset-password` | ResetPassPage | auth |

### 💰 Cashier Routes (Cashier Role)
| Route | Component | Feature |
|-------|-----------|---------|
| `/dashboard` | CashierDashboardPage | cashier |

### 👨‍ Admin Routes (Admin Role)
| Route | Component | Feature |
|-------|-----------|---------|
| `/admin/dashboard` | AdminDashboardPage | admin |
| `/admin/reports` | ReportsPage | admin |
| `/admin/menus` | MenuManagementPage | admin |
| `/admin/users` | UserManagementPage | admin |

## Import Examples

### Old Way (Before Refactoring)
```jsx
import LoginPage from "./features/auth/pages/LoginPage";
import CashierDashboardPage from "./features/cashier/pages/CashierDashboardPage";
```

### New Way (After Refactoring)
```jsx
import { LoginPage, RegisPage } from "./features/auth";
import { CashierDashboardPage } from "./features/cashier";
import { AdminDashboardPage, ReportsPage } from "./features/admin";
```

## Benefits of This Structure

✅ **Clear Separation** - Each role has its own isolated feature set
✅ **Easy to Scale** - Add new roles by creating new feature folders
✅ **Better Team Collaboration** - Teams can work on different features simultaneously
✅ **Simplified Imports** - Use index.js for cleaner imports
✅ **Self-Documenting** - README files explain each feature's purpose
✅ **Maintainable** - Changes in one role don't affect others
✅ **Testable** - Each feature can be tested independently

## Future Enhancements

- [ ] Add route guards for role-based access control
- [ ] Implement shared components in `shared/` folder
- [ ] Add custom hooks for each feature
- [ ] Create feature-specific contexts (AuthContext, CartContext)
- [ ] Add feature tests in each feature folder
- [ ] Implement lazy loading for routes
- [ ] Add feature flags for A/B testing
