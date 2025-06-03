import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';

import { ICON, NAV } from '@/configs/config-global';
import { NavItemProps } from '../types';

type StyledItemProps = Omit<NavItemProps, 'item'>;

export const Container = styled(Stack)({
  flexDirection: 'row',
  gap: 8,
});

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: prop => prop !== 'active' && prop !== 'open',
})<StyledItemProps>(({ active, disabled, open, depth, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const subItem = depth !== 1;

  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
    ...(!isLight && {
      color: theme.palette.primary.light,
    }),
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  };

  const hoverStyle = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  };

  return {
    flexShrink: 0,
    display: 'inline-flex',
    padding: theme.spacing(0, 0.75),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    height: NAV.H_DASHBOARD_ITEM_HORIZONTAL,
    '&:hover': hoverStyle,
    // Sub item
    ...(subItem && {
      width: '100%',
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
    }),
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': {
        ...activeStyle,
      },
    }),
    // Active sub item
    ...(subItem &&
      active && {
        ...activeSubStyle,
        '&:hover': {
          ...activeSubStyle,
        },
      }),
    // Open
    ...(open && !active && hoverStyle),
    // Disabled
    ...(disabled && {
      '&.Mui-disabled': {
        opacity: 0.64,
      },
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
  marginRight: 8,
  flexShrink: 0,
  width: ICON.NAV_ITEM_HORIZONTAL,
  height: ICON.NAV_ITEM_HORIZONTAL,
});

// ----------------------------------------------------------------------

export const StyledPopover = styled(Popover)(({ theme }: any) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: '#fff',
  },
}));
