import type {
  NavigationConfig,
  NavigationItemBase,
} from './types';
import {
  NavigationLeaf,
  NavigationComposite,
} from './types';

/**
 * Flatten all routes from navigation config
 * Handles both Leaf and Composite nodes recursively
 */
export const flattenRoutes = (config: NavigationConfig): NavigationLeaf[] => {
  const routes: NavigationLeaf[] = [];

  for (const item of config) {
    routes.push(...item.getRoutes());
  }

  return routes;
};

/**
 * Get top-level sidebar items (for rendering in drawer)
 * Returns only items that should be shown in sidebar
 */
export const getTopLevelSidebarItems = (
  config: NavigationConfig
): NavigationItemBase[] => {
  return config.filter(item => item.showInSidebar !== false);
};

/**
 * Get all sidebar items (flattened, including nested)
 * Useful for search or breadcrumb functionality
 */
export const getAllSidebarItems = (
  config: NavigationConfig
): NavigationItemBase[] => {
  const items: NavigationItemBase[] = [];

  for (const item of config) {
    items.push(...item.getSidebarItems());
  }

  return items;
};

/**
 * Breadcrumb item type
 */
export interface BreadcrumbItem {
  label: string;
  path: string;
}

/**
 * Find breadcrumb path for a given route path
 * Recursively searches through navigation config to build breadcrumb trail
 */
export const getBreadcrumbPath = (
  config: NavigationConfig,
  currentPath: string
): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [];
  const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';

  // Helper function to search recursively and build breadcrumb trail
  const findPath = (
    items: NavigationItemBase[],
    parents: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null => {
    for (const item of items) {
      // Check if this is a leaf node that matches the current path
      if (item instanceof NavigationLeaf) {
        const normalizedItemPath = item.path.replace(/\/$/, '') || '/';
        if (normalizedItemPath === normalizedCurrentPath) {
          // Found the matching route, return breadcrumb trail
          return [...parents, { label: item.label, path: item.path }];
        }
      }

      // If it's a composite, check children
      if (item instanceof NavigationComposite) {
        // Find first child with a path to use as parent path
        const getFirstChildPath = (children: NavigationItemBase[]): string => {
          for (const child of children) {
            if (child instanceof NavigationLeaf) {
              // Extract parent path from child path
              const childPath = child.path;
              const pathParts = childPath.split('/').filter(p => p);
              if (pathParts.length > 1) {
                // Remove last part to get parent path
                return '/' + pathParts.slice(0, -1).join('/');
              }
              return childPath;
            } else if (child instanceof NavigationComposite) {
              const childPath = getFirstChildPath(child.children);
              if (childPath) return childPath;
            }
          }
          return '';
        };

        // Build parent breadcrumb
        const parentPath = item.path || getFirstChildPath(item.children);
        const parentBreadcrumb: BreadcrumbItem = {
          label: item.label,
          path: parentPath,
        };

        // Recursively search in children
        const result = findPath(item.children, [
          ...parents,
          parentBreadcrumb,
        ]);

        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  // Find the path in config
  const result = findPath(config);

  if (result) {
    // Always add Home as first breadcrumb if not already there
    if (result[0]?.path !== '/') {
      breadcrumbs.push({ label: 'Home', path: '/' });
    }
    breadcrumbs.push(...result);
  } else {
    // If not found, just show Home
    breadcrumbs.push({ label: 'Home', path: '/' });
  }

  return breadcrumbs;
};

