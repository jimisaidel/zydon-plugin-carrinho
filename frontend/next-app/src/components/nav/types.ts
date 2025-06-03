import React from 'react';
import { StackProps } from '@mui/material/Stack';
import { ListItemButtonProps } from '@mui/material/ListItemButton';

export type INavItem = {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
};

export type NavItemProps = INavItem & ListItemButtonProps;

export type NavItemButtonProps = INavItem &
  ListItemButtonProps & {
    onNavigate(event: React.MouseEvent<HTMLButtonElement>, to: string): void;
  };

export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export interface NavSectionProps extends StackProps {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
  loading?: boolean;
}

export interface NavSectionWithButtonProps extends StackProps {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
  onNavigate(event: React.MouseEvent<HTMLButtonElement>, to: string): void;
  pathname: string;
}
