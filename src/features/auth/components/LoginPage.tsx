import * as React from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@/shared/components';
import { useAuth } from '@/app/providers';

/**
 * Login Page Component
 * Handles user authentication
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  // Get the page user was trying to access before login
  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      // Redirect to the page user was trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Web Test Payment Gateway
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Sign In
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  Demo Credentials:
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  color="text.secondary"
                >
                  Admin: admin@example.com / admin123
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  color="text.secondary"
                >
                  User: user@example.com / user123
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  color="text.secondary"
                >
                  Manager: manager@example.com / manager123
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
