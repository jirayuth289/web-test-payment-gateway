import React from 'react';
import {
  Container,
  Box,
  Chip,
  Card,
  Typography,
  CardContent,
} from '@/shared/components';
import { carStatusColors } from '@/core/theme';

const DashboardOverview: React.FC = () => {
  const features = [
    { name: 'Dashboard', status: 'available' as const },
    { name: 'Calendar', status: 'available' as const },
    { name: 'Booking Management', status: 'booked' as const },
    { name: 'Car Management', status: 'maintenance' as const },
    { name: 'Reports', status: 'available' as const },
  ];

  return (
    <Container maxWidth={false}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Car Rental Scheduler
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This is a test component for the new scalable project structure with
          MUI integration.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Available Features
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {features.map(feature => (
                  <Chip
                    key={feature.name}
                    label={feature.name}
                    color={
                      feature.status === 'available'
                        ? 'success'
                        : feature.status === 'booked'
                          ? 'error'
                          : 'warning'
                    }
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Car Status Colors
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: carStatusColors.available,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Available</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: carStatusColors.booked,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Booked</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: carStatusColors.maintenance,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Maintenance</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: carStatusColors.unavailable,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Unavailable</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardOverview;
