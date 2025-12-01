import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
} from '@/shared/components';

const ProfileSettings: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Profile Settings
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Manage your profile information
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is a test component for nested sidebar navigation. Profile
            settings page will be implemented here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileSettings;
