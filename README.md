# NextJS Todo App

A modern, full-stack todo application built with Next.js 15, featuring secure authentication, real-time updates, and shareable state management.

## Tech Stack & Why

### Core Framework
- Next.js 15.4.1 - Latest version with App Router for optimal performance and developer experience
- React 19.1.0 - Latest React with improved concurrent features and Server Components
- TypeScript 5 - Full type safety and better developer experience

### Authentication
- Auth.js v5 (NextAuth v5) - Modern, secure authentication with GitHub OAuth
- Why: Industry standard, excellent security, seamless OAuth integration, and database session management

### Database & ORM
- PostgreSQL with Neon - Serverless production-ready PostgreSQL database with auto-scaling and hibernation
- Drizzle ORM 0.44.3 - Type-safe ORM with excellent TypeScript integration
- Why: Production-grade scalability, support concurrent users , built-in SSL security, generous free tier, and complete type safety from database to UI
  
### Styling
- Tailwind CSS v4 - Utility-first CSS framework with latest architecture
- Lucide React - Modern, consistent icon system
- Why: Rapid development, consistent design system, excellent performance, and maintainability

### State Management & Data Fetching
- Server Actions - Next.js native data mutations
- URL State - Query parameters for shareable application state
- React 19 useTransition -  UI updates
- Why: Built-in caching, automatic revalidation, and excellent UX with minimal client-side JavaScript

## How to Run Locally

### Prerequisites
- Node.js 18+ 
- GitHub account (for OAuth setup)

### Setup Instructions

1. Clone and install dependencies:
```bash
git clone <repository-url>
cd nextjs-todo-app
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure GitHub OAuth:
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Create new OAuth App:
     - Application name: "NextJS Todo App"
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Secret
     
4. Create Neon PostgreSQL Database:

- Go to https://neon.tech/
- Sign up with GitHub or Google
- Click “Create Project” → Select PostgreSQL
- Once the project is created:
- Copy the connection string (e.g., postgresql://...)
- npx drizzle-kit push

5. Update `.env`:
```env
DATABASE_URL= connection string
AUTH_SECRET=your-32-character-secret-key
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
```

6. Generate AUTH_SECRET:
"https://generate-random.org/"

7. Run the application:
```bash
npm run dev
```

8. Visit `http://localhost:3000`



##  Architecture Decisions

### Server-Side Rendering (SSR)
- Where Applied: Dashboard page (`/dashboard`)
- Why: Ensures users always see fresh task data on page load
- Implementation: Using `await getTasks()` in Server Component for real-time data fetching

### Static Site Generation (SSG)
- Where Applied: Landing page (`/`) and authentication pages
- Why: These pages don't require user-specific data and benefit from static optimization
- Implementation: Pure Server Components with no dynamic data dependencies

### Caching Strategy
- Next.js Automatic Caching: Server Components and `fetch` requests cached by default
- Server Actions with Revalidation: `revalidatePath('/dashboard')` after mutations
- Database Query Caching: Drizzle ORM queries cached at the Next.js level
- Why: Optimal performance with automatic cache invalidation when data changes

### Authentication Architecture
- Where Applied: 
  - Route protection on `/dashboard` and all task operations
  - Middleware for automatic auth checking
  
- Implementation: 
  - `auth()` function for server-side auth checks
  - `SessionProvider` for client-side auth state


### Data Flow
```
User Action → Server Action → Database → Revalidate Cache → UI Update
```

### Deploymen 

- This project is deployed on Vercel
- Link https://to-do-app-ten-zeta-74.vercel.app/
- Live Production Screenshots
  <img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/592017ee-d508-47d6-8813-41e21e94c5d1" />
  <img width="1918" height="892" alt="image" src="https://github.com/user-attachments/assets/2dfcd5e9-856d-4313-a577-412ff0aa5328" />
  <img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/6d7d6ce1-53ef-43d5-81b1-7a83ceecbed5" />


##  Features Implemented

### Core Todo Functionality
-  Add tasks with title and optional description
-  Mark tasks as completed/incomplete
-  Delete tasks with confirmation
-  Inline editing of tasks
-  Visual separation of pending vs completed tasks

### Advanced Features
- Smart Sorting: By date, completion status, or title
- Shareable URLs: `?sort=title&order=asc` for sharing specific views
- Real-time Updates: Optimistic UI with `useTransition`
- Responsive Design: Works seamlessly on all devices
- *Error Handling: Comprehensive error states and validation

### User Experience
- Loading States: Visual feedback during operations
- Empty States: Helpful messaging when no tasks exist
- Copy-to-Clipboard: One-click URL sharing
- Confirmation Dialogs: Prevent accidental deletions

##  Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── auth/signin/       # Authentication pages (SSG)
│   ├── dashboard/         # Main dashboard (SSR)
│   ├── api/auth/          # Auth.js API routes
│   └── (root pages)       # Landing page (SSG)
├── components/            # React components
│   ├── auth-provider.tsx  # Session management
│   ├── task-*.tsx         # Task-related components
│   └── ui components      # Reusable UI elements
├── lib/                   # Core utilities
│   ├── actions/           # Server Actions (mutations)
│   ├── auth.ts           # Auth.js configuration
│   └── db/               # Database schema & client
```

## Technical Highlights

### Performance Optimizations
- Server Components: Reduce JavaScript bundle size
- Automatic Code Splitting: Next.js 15 optimizations
- Image Optimization: Next.js built-in image handling

### Developer Experience
- Full TypeScript: End-to-end type safety
- Server Actions: Simplified data mutations
- Hot Reload: Instant development feedback
- ESLint: Code quality enforcement

### Security
- CSRF Protection: Built into Auth.js
- SQL Injection Prevention: Drizzle ORM parameterized queries


## What I Would Improve With More Time

### Feature Enhancements
- Due Dates: Add task deadlines with calendar integration
- Categories/Tags: Organize tasks with labels and filtering
- Task Dependencies: Link related tasks together
- Recurring Tasks: Automatic task creation for repeating items

### Technical Improvements
- Real-time Sync: WebSockets for live updates across devices
- Offline Support: PWA capabilities with service workers
- Search Functionality: Full-text search across tasks
- Bulk Operations: Select and modify multiple tasks at once

### User Experience
- Drag & Drop: Reorder tasks intuitively
- Dark Mode: Theme switching capability
- Mobile App: React Native companion app
- Email Notifications: Task reminders and updates


### Developer Experience
- Testing Suite: Unit and integration
- CI/CD Pipeline: Automated testing and deployment
- Documentation: API docs and component library
- Monitoring: Error tracking and performance monitoring

