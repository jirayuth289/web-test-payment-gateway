import { BrowserRouter, useLocation } from 'react-router';
import { AppLayout } from '@/app/components';
import { AppRoutes } from '@/app/router';
import { AppContainer } from './App.styles';

/**
 * App Content Component
 * Conditionally renders AppLayout based on current route
 */
const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return (
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppContainer>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
