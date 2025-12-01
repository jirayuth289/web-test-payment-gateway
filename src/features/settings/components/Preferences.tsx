import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
} from '@/shared/components';

const Preferences: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Preferences
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Customize your preferences
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Preferences
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is a nested submenu example for Profile settings. Preferences
            page will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Preferences;
