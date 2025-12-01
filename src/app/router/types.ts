import * as React from 'react';

/**
 * Navigation item metadata
 */
export interface NavigationMetadata {
  /** Route description */
  description?: string;
  /** Required permissions/roles */
  roles?: string[];
  /** Whether route requires authentication */
  requiresAuth?: boolean;
}

/**
 * Base abstract class for navigation items (Composite Pattern)
 * Defines common interface for both Leaf and Composite nodes
 */
export abstract class NavigationItemBase {
  /** Unique identifier for the route */
  abstract id: string;
  /** Display label in sidebar */
  abstract label: string;
  /** Icon component for sidebar */
  abstract icon: React.ComponentType;
  /** Whether this item should be shown in sidebar */
  abstract showInSidebar: boolean;
  /** Additional metadata */
  abstract metadata?: NavigationMetadata;

  /**
   * Check if this is a composite node (has children)
   */
  abstract isComposite(): boolean;

  /**
   * Get all leaf routes (flattened)
   * For Leaf: returns itself
   * For Composite: returns all nested leaf routes
   */
  abstract getRoutes(): NavigationLeaf[];

  /**
   * Get sidebar items (only items that should be shown)
   * For Leaf: returns itself if showInSidebar is true
   * For Composite: returns itself and nested items
   */
  abstract getSidebarItems(): NavigationItemBase[];
}

/**
 * Leaf node class (Composite Pattern: Leaf)
 * Represents a single route without children
 */
export class NavigationLeaf extends NavigationItemBase {
  constructor(
    public id: string,
    public label: string,
    public path: string,
    public component: React.ComponentType,
    public icon: React.ComponentType,
    public showInSidebar: boolean = true,
    public metadata?: NavigationMetadata
  ) {
    super();
  }

  isComposite(): boolean {
    return false;
  }

  getRoutes(): NavigationLeaf[] {
    return [this];
  }

  getSidebarItems(): NavigationItemBase[] {
    return this.showInSidebar ? [this] : [];
  }
}

/**
 * Composite node class (Composite Pattern: Composite)
 * Represents a parent with nested children
 */
export class NavigationComposite extends NavigationItemBase {
  public children: NavigationItemBase[];

  constructor(
    public id: string,
    public label: string,
    public icon: React.ComponentType,
    children: NavigationItemBase[],
    public showInSidebar: boolean = true,
    public metadata?: NavigationMetadata,
    /** Optional default path for composite node */
    public path?: string,
    /** Optional default component for composite node */
    public component?: React.ComponentType
  ) {
    super();
    this.children = children;
  }

  isComposite(): boolean {
    return true;
  }

  getRoutes(): NavigationLeaf[] {
    const routes: NavigationLeaf[] = [];

    // If composite has its own route, add it
    if (this.path && this.component) {
      routes.push(
        new NavigationLeaf(
          this.id,
          this.label,
          this.path,
          this.component,
          this.icon,
          false, // Don't show composite route in sidebar if it has children
          this.metadata
        )
      );
    }

    // Flatten all nested routes
    for (const child of this.children) {
      routes.push(...child.getRoutes());
    }

    return routes;
  }

  getSidebarItems(): NavigationItemBase[] {
    const items: NavigationItemBase[] = [];

    // Add composite itself if it should be shown
    if (this.showInSidebar) {
      items.push(this);
    }

    // Add nested items
    for (const child of this.children) {
      items.push(...child.getSidebarItems());
    }

    return items;
  }
}

/**
 * Navigation configuration type
 * Can contain both Leaf and Composite nodes
 */
export type NavigationConfig = NavigationItemBase[];
