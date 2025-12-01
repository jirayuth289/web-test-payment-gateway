import * as React from 'react';
import { useLocation } from 'react-router';
import { Box } from '@/shared/components';
import { Breadcrumbs } from '@/shared/components/ui';
import { navigationConfig } from '@/app/router/config';
import { getBreadcrumbPath } from '@/app/router/utils';

/**
 * Breadcrumb navigation component
 * Displays hierarchical navigation path based on current route
 */
export const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = React.useMemo(
    () => getBreadcrumbPath(navigationConfig, location.pathname),
    [location.pathname]
  );

  // Don't show breadcrumb if only Home
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs items={breadcrumbs} />
    </Box>
  );
};
