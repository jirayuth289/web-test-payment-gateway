import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
} from '@/shared/components';

const PersonalInfo: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Personal Information
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Manage your personal details
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Personal Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is a nested submenu example for Profile settings. Personal
            information page will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PersonalInfo;
