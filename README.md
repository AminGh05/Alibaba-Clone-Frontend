
# Alibaba Clone Frontend

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/AminGh05/Alibaba-Clone-Frontend/actions)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Apache-green)](LICENSE)

A modern, full-featured travel reservation frontend inspired by Alibaba.ir, built with **React**, **TypeScript**, and **Vite**. This project demonstrates best practices in scalable frontend architecture, modular design, and seamless API integration.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Architecture Overview](#architecture-overview)
- [Core Modules & Components](#core-modules--components)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Theming & Styling](#theming--styling)
- [Routing](#routing)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🔍 **Search Transportation**: Find flights, trains, and buses between cities with advanced filters and date selection.
- 🛒 **Travel Reservation**: Book tickets, select seats, and manage passengers for each order.
- 👤 **User Authentication**: Register, login, and manage your profile securely.
- 💳 **Account Management**: View and edit bank account info, top up balance, and see transaction history.
- 🧑‍🤝‍🧑 **People Management**: Add and manage people for group bookings (family, friends, etc.).
- 📜 **Travel & Transaction History**: View past travels, ticket details, and financial transactions.
- 📱 **Responsive Design**: Mobile-first, works seamlessly on all devices.
- 🛡️ **Secure API Integration**: JWT authentication, error handling, and protected routes.
- 🧩 **Modular Architecture**: Feature-based folder structure for scalability and maintainability.

## Screenshots

<div align="center">
  <img src="screenshots\SS01.png" alt="Home" />
  <img src="screenshots\SS02.png" alt="Profile" />
  <img src="screenshots\SS03.png" alt="Reserve" />
</div>

## Project Structure

```bash
alibaba-clone-frontend/
├── public/                        # Static assets (logo, etc.)
├── src/
│   ├── api/                       # API clients (agent, feature APIs)
│   │   ├── agent.ts               # Axios instance with interceptors
│   │   └── features/              # Feature-specific API modules
│   ├── assets/                    # Images, icons, etc.
│   ├── components/
│   │   └── ui/                    # Reusable UI components (button, card, input, etc.)
│   ├── features/                  # Feature modules
│   │   ├── account/               # Account management (profile, bank, people, travels, transactions)
│   │   │   ├── components/        # Account feature components
│   │   │   └── pages/             # Account feature pages
│   │   ├── authentication/        # Login, register
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── common/                # Layout (Header, Footer, MainLayout)
│   │   ├── home/                  # Home page, search
│   │   │   ├── components/
│   │   │   └── pages/
│   │   └── reservation/           # Reserve travel, order status
│   │       ├── components/
│   │       └── pages/
│   ├── lib/                       # Utility functions
│   ├── shared/
│   │   ├── models/                # TypeScript DTOs for API
│   │   ├── routes.tsx             # App routes
│   │   └── store/                 # Zustand stores (auth)
│   ├── App.tsx                    # App entry
│   ├── main.tsx                   # ReactDOM entry
│   └── index.css                  # Global styles (Tailwind)
├── package.json
├── vite.config.ts
└── ...
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Zustand** (state management)
- **React Router 6** (routing)
- **Axios** (API requests)
- **Tailwind CSS** (styling)
- **Jest** + **React Testing Library** (testing)
- **ESLint** + **Prettier** (code quality)

## Setup & Installation

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/AminGh05/Alibaba-Clone-Frontend.git
cd Alibaba-Clone-Frontend/alibaba-clone-frontend
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root with the following (edit as needed):

```env
VITE_API_BASE_URL=https://localhost:7131/api
VITE_API_TIMEOUT=10000
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Home**: Search for transportation, view featured cities and options.
- **Login/Register**: Authenticate and access your account.
- **Profile**: Manage your account, view transactions, travels, and people.
- **Reserve Travel**: Book tickets, select seats, and add passengers.
- **Travel Details**: View ticket and travel details for each order.

## Architecture Overview

This project uses a **feature-based modular architecture**:

- **Presentation Layer**: UI components, pages, layouts.
- **Business Logic Layer**: Feature modules, state stores, hooks.
- **Data Access Layer**: API clients, DTO models.

**Principles:**

- Separation of concerns (UI, logic, data)
- Reusable, composable components
- Type safety with TypeScript
- Centralized state management

## Core Modules & Components

### UI Components (`src/components/ui/`)

- **Button**: Consistent button styles and variants.
- **Card**: Card layout for displaying grouped content.
- **Input, Select, Tabs, Dialog, Badge, Label, RadioGroup**: Form and layout primitives.

#### Sample: Custom Button Component

```tsx
// src/components/ui/button.tsx
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", loading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`btn btn-${variant}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
);
```

### Feature Modules (`src/features/`)

- **account**: Profile, bank account, people, travels, transactions.
- **authentication**: Login, register, modals.
- **home**: Home page, search, city dropdown, transportation cards.
- **reservation**: Reserve travel, order success/failure.
- **common**: Main layout, header, footer.

#### Sample: API Call with Axios

```ts
// src/api/features/authApi.ts
import agent from "../agent";
import { LoginRequestDto } from "@/shared/models/authentication/LoginRequestDto";

export const login = async (data: LoginRequestDto) => {
  return await agent.post("/Auth/login", data);
};
```

### Pages

- **Home**: `src/features/home/pages/Home.tsx`
- **Login/Register**: `src/features/authentication/pages/`
- **Profile**: `src/features/account/pages/Profile.tsx` (tabs for account, transactions, travels, people)
- **Reserve Travel**: `src/features/reservation/pages/ReserveTravel.tsx`
- **Travel Details**: `src/features/account/pages/TravelDetails.tsx`
- **Not Found**: `src/features/error/pages/NotFound.tsx`

### Models

- DTOs for API requests/responses in `src/shared/models/` (e.g., `ProfileDto`, `TicketOrderSummaryDto`, etc.)

#### Sample: Zustand Auth Store

```ts
// src/shared/store/authStore.ts
import create from "zustand";

interface AuthState {
  user: any;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

## API Integration

- **API Layer**: All API calls are in `src/api/` (e.g., `agent.ts`, `features/accountApi.ts`, etc.)
- **Axios** is configured with interceptors for JWT authentication and error handling.
- **Environment Variables**: API base URL and other config can be set in `.env`.
- **DTOs**: All request/response types are strongly typed.

## State Management

- **Zustand**: Used for authentication state (`src/shared/store/authStore.ts`).
- **React Context**: Used for some shared state.
- No Redux or MobX.

## Theming & Styling

- **Tailwind CSS**: Utility-first CSS framework.
- **Dark/Light Theme**: Toggle supported via state and Tailwind's dark mode.
- **Customizable**: Edit `index.css` and Tailwind config as needed.

## Routing

- **React Router 6**: All routes defined in `src/shared/routes.tsx`.
- Main routes:
  - `/` - Home
  - `/login` - Login
  - `/register` - Register
  - `/profile` - User profile (with tabs)
  - `/travel/:ticketOrderId` - Travel details
  - `/reserve/:transportationId` - Reserve travel
  - `*` - Not found

## Testing

- **Jest** and **React Testing Library** are set up (see `package.json` scripts).
- Add your test files in `src/` as needed (e.g., `Button.test.tsx`).
- Run tests with:

```bash
npm run test
# or
yarn test
```

## Contributing

1. Fork the repo and create a feature branch.
2. Follow code style (TypeScript, ESLint, Prettier).
3. Add tests for new features.
4. Submit a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

<div align="center">
  <strong>Built with ❤️ by AminGh05</strong>
  <br>
  <sub>⭐ Star this repository if you find it helpful!</sub>
</div>
