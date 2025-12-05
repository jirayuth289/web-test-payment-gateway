import { DashboardOverview, PaymentComponent } from '@/features';
import ChargeManagement from '@/features/order-checkout/components';
import {
  AccountSettings,
  PersonalInfo,
  Preferences,
} from '@/features/settings';
import {
  CarCrashOutlinedIcon,
  DashboardOutlinedIcon,
  SettingsIcon,
  ProfileIcon,
  AccountIcon,
  PersonalInfoIcon,
  PreferencesIcon,
} from '@/shared/components';
import {
  NavigationLeaf,
  NavigationComposite,
  type NavigationConfig,
} from './types';
import { Payment } from '@mui/icons-material';

/**
 * Application navigation configuration (Composite Pattern)
 * Single source of truth for routes and sidebar navigation
 * 
 * Uses Composite Pattern with TypeScript classes:
 * - NavigationLeaf: Simple routes without children
 * - NavigationComposite: Parent items with nested children
 * 
 * @example
 * ```tsx
 * // Add new leaf route
 * new NavigationLeaf(
 *   'reports',
 *   'Reports',
 *   '/reports',
 *   Reports,
 *   ReportsIcon,
 *   true, // showInSidebar
 *   { description: 'View reports', requiresAuth: true }
 * )
 * 
 * // Add composite node with children (expandable sub-menu)
 * new NavigationComposite(
 *   'settings',
 *   'Settings',
 *   SettingsIcon,
 *   [
 *     new NavigationLeaf('settings-profile', 'Profile', '/settings/profile', ProfileSettings, ProfileIcon),
 *     new NavigationLeaf('settings-account', 'Account', '/settings/account', AccountSettings, AccountIcon),
 *   ],
 *   true, // showInSidebar
 *   { description: 'Application settings' }
 * )
 * ```
 */
export const navigationConfig: NavigationConfig = [
  new NavigationLeaf(
    'dashboard',
    'Dashboard',
    '/',
    DashboardOverview,
    DashboardOutlinedIcon,
    true,
    {
      description: 'Main dashboard overview',
      requiresAuth: true,
    }
  ),
  new NavigationLeaf(
    'order-checkout',
    'Order Checkout ',
    '/order-checkout',
    ChargeManagement,
    CarCrashOutlinedIcon,
    true,
    {
      description: 'Manage charge inventory and details',
      requiresAuth: true,
    }
  ),
  // Composite node with nested children (nested sidebar example)
  new NavigationComposite(
    'settings',
    'Settings',
    SettingsIcon,
    [
      // Profile with nested submenu (double nested example)
      new NavigationComposite(
        'settings-profile',
        'Profile',
        ProfileIcon,
        [
          new NavigationLeaf(
            'settings-profile-personal',
            'Personal Info',
            '/settings/profile/personal',
            PersonalInfo,
            PersonalInfoIcon,
            true
          ),
          new NavigationLeaf(
            'settings-profile-preferences',
            'Preferences',
            '/settings/profile/preferences',
            Preferences,
            PreferencesIcon,
            true
          ),
        ],
        true, // showInSidebar
        { description: 'Profile settings and preferences', requiresAuth: true }
      ),
      new NavigationLeaf(
        'settings-account',
        'Account',
        '/settings/account',
        AccountSettings,
        AccountIcon,
        true
      ),
    ],
    true, // showInSidebar
    { description: 'Application settings', requiresAuth: true }
  ),
  new NavigationLeaf(
    'payment',
    'Payment',
    '/payment',
    PaymentComponent,
    AccountIcon,
    true,
    {
      description: 'Payment',
      requiresAuth: true,
    }
  ),
];

