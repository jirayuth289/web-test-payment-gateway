import * as React from 'react';
import MuiBreadcrumbs, {
  type BreadcrumbsProps as MuiBreadcrumbsProps,
} from '@mui/material/Breadcrumbs';
import { Link } from 'react-router';
import { Typography } from './Typography';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  items: Array<{
    label: string;
    path: string;
  }>;
}

/**
 * Breadcrumbs component for navigation
 * Displays hierarchical navigation path
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  ...props
}) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb" {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={item.path} color="text.primary">
              {item.label}
            </Typography>
          );
        }

        // If path is empty, render as non-clickable text
        if (!item.path) {
          return (
            <Typography key={item.label} color="text.secondary">
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Typography color="text.secondary">{item.label}</Typography>
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
