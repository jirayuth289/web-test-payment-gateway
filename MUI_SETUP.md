# Material-UI (MUI) Setup Documentation

## 🎨 MUI Integration Complete

The Car Rental Scheduler project now has a complete Material-UI setup with custom theme configuration and reusable components.

## 📦 Installed Packages

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/lab
```

### Package Versions

- `@mui/material`: ^7.3.2
- `@mui/icons-material`: ^7.3.2
- `@mui/lab`: ^7.0.0-beta.17
- `@emotion/react`: ^11.13.5
- `@emotion/styled`: ^11.13.5

## 🎨 Theme Configuration

### Custom Theme (`src/core/theme/index.ts`)

The theme is specifically designed for the Car Rental Scheduler with:

#### Color Palette

- **Primary**: Blue (#1976d2) - for primary actions
- **Secondary**: Red (#dc004e) - for secondary actions
- **Success**: Green (#2e7d32) - for available cars
- **Warning**: Orange (#ed6c02) - for maintenance
- **Error**: Red (#d32f2f) - for booked/error states
- **Info**: Light Blue (#0288d1) - for information

#### Car Status Colors

```typescript
export const carStatusColors = {
  available: theme.palette.success.main, // Green
  booked: theme.palette.error.main, // Red
  maintenance: theme.palette.warning.main, // Orange
  unavailable: theme.palette.grey[500], // Grey
} as const;
```

#### Typography

- Font Family: Roboto, Helvetica, Arial
- Responsive heading sizes (h1-h6)
- Consistent line heights and font weights
- Button text transformation disabled

#### Component Customizations

- **Buttons**: Rounded corners (8px), custom shadows
- **Cards**: Rounded corners (12px), subtle shadows
- **Text Fields**: Rounded corners (8px)
- **Chips**: Rounded corners (16px)

## 🏗️ Component Architecture

### Theme Provider (`src/app/providers/ThemeProvider.tsx`)

```typescript
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/core/theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
```

### Shared UI Components (`src/shared/components/ui/`)

#### Available Components:

- **Button**: Customized MUI Button with consistent styling
- **TextField**: Form input with custom styling
- **Card**: Container component with custom elevation
- **Chip**: Status indicators with color variants
- **Modal**: Dialog component for pop-ups

#### Layout Components (`src/shared/components/layout/`)

- **Container**: Responsive container with max-width
- **Grid**: Layout grid system (simplified wrapper)
- **Box**: Flexible container component

### Usage Examples

#### Importing Components

```typescript
// UI Components
import { Button, TextField, Card, Chip, Modal } from '@/shared/components/ui';

// Layout Components
import { Container, Box } from '@/shared/components/layout';

// Theme Colors
import { carStatusColors } from '@/core/theme';
```

#### Using Car Status Colors

```typescript
import { carStatusColors } from '@/core/theme';

// In your component
<Box
  sx={{
    backgroundColor: carStatusColors.available,
    color: 'white',
    padding: 1,
    borderRadius: 1,
  }}
>
  Available Car
</Box>
```

#### Responsive Design

```typescript
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3,
  }}
>
  {/* Content */}
</Box>
```

## 🚀 Integration with App

### Main App Setup (`src/main.tsx`)

```typescript
import { ThemeProvider } from '@/app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

### App Component (`src/App.tsx`)

```typescript
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Rental Scheduler
          </Typography>
        </Toolbar>
      </AppBar>
      <DashboardOverview />
    </Box>
  );
}
```

## 🎯 Sprint 1 Ready Features

### Dashboard Component

The `DashboardOverview` component demonstrates:

- ✅ MUI theme integration
- ✅ Responsive design with Flexbox
- ✅ Car status color system
- ✅ Typography hierarchy
- ✅ Card-based layout
- ✅ Chip components for status indicators

### Key Features for Sprint 1:

1. **Calendar View**: Ready for MUI Calendar components
2. **Status Indicators**: Color-coded car status system
3. **Pop-up Modals**: Modal component ready for booking details
4. **Responsive Design**: Mobile-first approach with MUI breakpoints

## 🛠️ Development Guidelines

### Best Practices

1. **Use Theme Colors**: Always use theme colors instead of hardcoded values
2. **Responsive Design**: Use MUI breakpoints for responsive layouts
3. **Component Composition**: Build complex components from simple MUI components
4. **Consistent Spacing**: Use theme spacing units (8px base)
5. **Typography**: Use theme typography variants

### File Organization

```
src/
├── core/
│   └── theme/           # Theme configuration
├── shared/
│   └── components/
│       ├── ui/          # Basic UI components
│       └── layout/      # Layout components
└── app/
    └── providers/       # Theme provider
```

## 🧪 Testing

### Build Verification

```bash
npm run build    # ✅ Successful
npm run lint     # ✅ No errors
npm run format   # ✅ Code formatted
```

### Development Server

```bash
npm run dev      # Start development server
```

## 🎨 Customization

### Adding New Colors

```typescript
// In src/core/theme/index.ts
const themeOptions: ThemeOptions = {
  palette: {
    // Add custom colors
    custom: {
      main: '#your-color',
      light: '#lighter-color',
      dark: '#darker-color',
    },
  },
};
```

### Creating New Components

```typescript
// In src/shared/components/ui/YourComponent.tsx
import React from 'react';
import { YourMuiComponent, type YourMuiComponentProps } from '@mui/material';

export type YourComponentProps = YourMuiComponentProps;

export const YourComponent: React.FC<YourComponentProps> = ({ ...props }) => {
  return <YourMuiComponent {...props} />;
};
```

## 🚀 Next Steps for Sprint 1

1. **Calendar Component**: Implement MUI Calendar for car scheduling
2. **Booking Modal**: Create detailed booking pop-up using Modal component
3. **Data Tables**: Use MUI Table for car listings
4. **Form Components**: Build booking forms with MUI form components
5. **Navigation**: Implement MUI AppBar and Drawer for navigation

The MUI setup is now complete and ready for Sprint 1 development! 🎉

