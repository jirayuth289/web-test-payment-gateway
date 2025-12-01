import * as React from 'react';
import {
  Collapse,
  ExpandLessIcon,
  ExpandMoreIcon,
  List,
} from '@/shared/components';
import {
  NavigationComposite,
  NavigationItemBase,
  NavigationLeaf,
} from '@/app/router/types';
import {
  SidebarLink,
  SidebarListItem,
  SidebarListItemButton,
  SidebarListItemIcon,
  SidebarListItemText,
} from './layout.styles';

interface SidebarItemProps {
  item: NavigationItemBase;
  open: boolean;
  level?: number;
}

/**
 * Sidebar item component (Composite Pattern)
 * Handles both Leaf and Composite nodes recursively
 *
 * - Leaf nodes: Render as navigation link
 * - Composite nodes: Render with expandable sub-menu
 */
export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  open,
  level = 0,
}) => {
  // If it's a composite node, use Composite component
  if (item.isComposite()) {
    return (
      <SidebarComposite
        item={item as NavigationComposite}
        open={open}
        level={level}
      />
    );
  }

  // If it's a leaf node, render as link
  if (item instanceof NavigationLeaf) {
    return <SidebarLeaf item={item} open={open} level={level} />;
  }

  return null;
};

/**
 * Leaf node component (Composite Pattern: Leaf)
 * Represents a single navigation item without children
 */
interface SidebarLeafProps {
  item: NavigationLeaf;
  open: boolean;
  level?: number;
}

const SidebarLeaf: React.FC<SidebarLeafProps> = ({ item, open, level = 0 }) => {
  const IconComponent = item.icon;
  const paddingLeft = level > 0 ? 4 : 2;

  return (
    <SidebarLink to={item.path}>
      <SidebarListItem disablePadding>
        <SidebarListItemButton open={open} sx={{ pl: paddingLeft }}>
          <SidebarListItemIcon open={open}>
            <IconComponent />
          </SidebarListItemIcon>
          <SidebarListItemText primary={item.label} open={open} />
        </SidebarListItemButton>
      </SidebarListItem>
    </SidebarLink>
  );
};

/**
 * Composite node component (Composite Pattern: Composite)
 * Represents a parent with nested children and expandable sub-menu
 */
interface SidebarCompositeProps {
  item: NavigationComposite;
  open: boolean;
  level?: number;
}

const SidebarComposite: React.FC<SidebarCompositeProps> = ({
  item,
  open,
  level = 0,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const IconComponent = item.icon;
  const paddingLeft = level > 0 ? 4 : 2;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // If drawer is closed, don't show expand/collapse
  const showExpanded = open && expanded;

  return (
    <>
      {/* Composite header - clickable to expand/collapse */}
      <SidebarListItem disablePadding>
        <SidebarListItemButton
          open={open}
          onClick={handleToggle}
          sx={{ pl: paddingLeft }}
        >
          <SidebarListItemIcon open={open}>
            <IconComponent />
          </SidebarListItemIcon>
          <SidebarListItemText primary={item.label} open={open} />
          {open && (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </SidebarListItemButton>
      </SidebarListItem>

      {/* Nested children - collapsible */}
      <Collapse in={showExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map(child => (
            <SidebarItem
              key={child.id}
              item={child}
              open={open}
              level={level + 1}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
