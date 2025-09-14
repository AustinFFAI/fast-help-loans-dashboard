# Fast Help Loans Dashboard

A Next.js 15 dashboard application for managing loan applications at Fast Help Loans. This application provides a comprehensive interface for handling both commercial and residential loan applications across different categories.

## Application Overview

The Fast Help Loans Dashboard is designed to manage six types of loan applications:

### Commercial Loans

- **Acquisition**: Commercial property purchases
- **Construction**: Commercial property development projects
- **Refinance**: Refinancing existing commercial properties

### Residential Loans

- **Acquisition**: Residential property purchases
- **Construction**: Residential property development projects
- **Refinance**: Refinancing existing residential properties

## Key Features

- **Firebase Authentication**: Secure login with email/password
- **Role-Based Access Control**: Dual user system with Firebase Auth and backend API integration
- **Application Management**: View loan applications by type
- **Responsive Design**: Modern UI built with Radix UI components and Tailwind CSS
- **Data Tables**: Interactive tables powered by TanStack Table for application data
- **Protected Routes**: Authentication-required pages with automatic redirects

## Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Authentication**: Firebase Authentication
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS v4
- **Data Tables**: TanStack React Table
- **Icons**: Lucide React
- **Build Tool**: Turbopack for fast development

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the project root with the following Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=your_backend_api_url
API_URL=your_backend_api_url
X_FILLOUT_SECRET=your_fillout_secret
```

### Development

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Commands

- **Development**: `npm run dev` - Starts development server with Turbopack
- **Build**: `npm run build` - Creates production build
- **Start**: `npm start` - Starts production server
- **Lint**: `npm run lint` - Runs ESLint

## Application Structure

### Authentication Flow

- Firebase Authentication handles user login/registration
- Users are provisioned to the backend API creating `BackendUser` records
- Protected routes require authentication via `RequireAuth` component
- Global auth state managed through `AuthProvider`

### Route Organization

- `(protected)` route group: Authenticated pages
- Public routes: Login, registration, and landing pages
- Dynamic routes: `[id]` for individual application details

### Data Layer

- Backend API integration using `authorizedFetch()` with Firebase ID tokens
- Type-safe data fetching via factory pattern
- Data transformers convert raw API data to display-ready formats

## Authentication

- **Login Page**: `/login` - Email/password and Google sign-in options
- **Protected Routes**: All dashboard pages require authentication
- **Auto-redirect**: Unauthenticated users are redirected to login
- **Sign Out**: Available from the dashboard once authenticated

### Admin Account Setup

**First Admin Account:**

1. Create a regular user account through the standard registration process
2. Manually update the User record in the PostgreSQL backend database
3. Set the user's `role` field to `admin` in the database

**Subsequent Admin Accounts:**

- Admin users can invite new users and assign roles through the dashboard

## Project Architecture

The application follows Next.js 15 App Router conventions with:

- **Pages**: Located in `src/app/` following App Router structure
- **Components**: Reusable UI components in `src/components/`
- **Business Logic**: API layer and utilities in `src/lib/`
- **Types**: TypeScript definitions in `src/types/`
- **Path Aliases**: `@/*` maps to `src/*`

## Firebase Authentication Setup

Create a `.env.local` file in the project root with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Then run the development server:

```
npm run dev
```

Auth details:

- Email/password are supported on the login page `/login`.
- The home page `/` is protected and will redirect unauthenticated users to `/login`.
- A sign out button is available on the home page once signed in.
