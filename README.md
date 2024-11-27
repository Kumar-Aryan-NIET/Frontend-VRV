# VRV Security RBAC Dashboard

A modern Role-Based Access Control (RBAC) dashboard built with React, TypeScript, and TailwindCSS.

## Features

- **User Management**: Add, edit, and manage user accounts with status tracking
- **Role Management**: Create and configure roles with specific permissions
- **Permission System**: Granular permission control for different resources
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean and intuitive interface built with TailwindCSS and Headless UI

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- Headless UI
- React Router
- Vite

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── Roles.tsx
├── services/      # API and other services
│   └── api.ts
├── types/         # TypeScript type definitions
│   └── index.ts
├── App.tsx        # Main App component
└── main.tsx       # Application entry point
```

## Features Overview

### User Management

- View all users in a table format
- Add new users with name, email, and role assignments
- Toggle user status between active and inactive
- View user roles and permissions

### Role Management

- Create new roles with custom permissions
- View existing roles and their assigned permissions
- Organize permissions by resource type
- Granular control over role capabilities

### Dashboard

- Overview of system statistics
- Quick access to key metrics
- User and role count tracking

## Security Features

- Role-based access control implementation
- Permission-based feature access
- Secure user management
- Activity tracking and monitoring

## Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Modern React patterns and hooks
- Clean and maintainable code structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
