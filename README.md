# POS Frontend - Point of Sale System

A modern Point of Sale (POS) application built with React, Vite, and Tailwind CSS.

## 🏗️ Architecture

This project uses a **role-based feature architecture** with clear separation between different user roles:

- **🔐 Auth** - Shared authentication pages (Login, Register, Reset Password)
- **💰 Cashier** - POS operations for cashiers (Order, Payment, Receipt)
- **👨‍💼 Admin** - Management features for admins (Reports, Menus, Users)

For detailed structure, see [STRUCTURE.md](./STRUCTURE.md)

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── features/              # Role-based features
│   ├── auth/              # Login, Register, Reset Password
│   ├── cashier/           # Cashier dashboard & POS components
│   ├── admin/             # Admin dashboard & management
│   └── splashscreen/      # App splash screen
├── shared/                # Shared components & utilities
├── assets/                # Images, fonts, etc.
├── constants/             # App constants
├── styles/                # Global styles
└── router/                # Route configuration
```

## 🎯 Features

### Cashier Features
- ✅ Interactive POS dashboard
- ✅ Menu browsing with categories
- ✅ Order management (Dine-in & Take Away)
- ✅ Item notes/customization
- ✅ Payment processing
- ✅ Order archive
- ✅ Transaction success modal with receipt

### Admin Features (Coming Soon)
- 📊 Analytics dashboard
- 📈 Sales reports
- 🍽️ Menu management (CRUD)
- 👥 User management
- ⚙️ Settings & configuration

### Authentication
- 🔐 Login page
- 📝 Registration page
- 🔑 Password reset

##  Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

### Adding New Features

#### For Cashier Role:
```bash
# Create component in features/cashier/components/
# Export from features/cashier/index.js
# Add route in App.jsx if needed
```

#### For Admin Role:
```bash
# Create page in features/admin/pages/
# Export from features/admin/index.js
# Add route in App.jsx
```

### Import Examples

```jsx
// Import auth pages
import { LoginPage, RegisPage } from "@/features/auth";

// Import cashier components
import { CashierDashboardPage, CashierHeader } from "@/features/cashier";

// Import admin pages
import { AdminDashboardPage, ReportsPage } from "@/features/admin";
```

##  Documentation

- [Project Structure](./STRUCTURE.md) - Detailed folder structure and architecture
- [Features Documentation](./src/features/README.md) - Feature modules guide
- [Auth Feature](./src/features/auth/README.md) - Authentication details
- [Cashier Feature](./src/features/cashier/README.md) - Cashier operations
- [Admin Feature](./src/features/admin/README.md) - Admin management

## 🎨 Design System

- **Colors**: Primary (#3B5BDB), Success (#10B981), Warning (#F59E0B), Error (#EF4444)
- **Typography**: Roboto font family
- **Spacing**: Tailwind CSS spacing scale
- **Components**: Custom components following consistent design patterns

## 📄 License

[Your License Here]

---

**Built with ❤️ using React + Vite + Tailwind CSS**
