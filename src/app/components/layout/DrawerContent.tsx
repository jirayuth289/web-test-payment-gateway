import * as React from 'react';
import { List } from '@/shared/components';
import { navigationConfig } from '@/app/router/config';
import { getTopLevelSidebarItems } from '@/app/router/utils';
import { SidebarItem } from './SidebarItem';

interface DrawerContentProps {
  open: boolean;
}

/**
 * Drawer content component (Composite Pattern)
 * Renders sidebar navigation items from centralized config
 *
 * Uses Composite Pattern to handle hierarchical navigation:
 * - Top-level items are rendered
 * - Composite nodes handle their own children recursively
 * - Leaf nodes render as simple links
 */
export const DrawerContent: React.FC<DrawerContentProps> = ({ open }) => {
  const topLevelItems = React.useMemo(
    () => getTopLevelSidebarItems(navigationConfig),
    []
  );

  return (
    <List>
      {topLevelItems.map(item => (
        <SidebarItem key={item.id} item={item} open={open} level={0} />
      ))}
    </List>
  );
};
