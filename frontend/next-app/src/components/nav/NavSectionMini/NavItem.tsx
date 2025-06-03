import { forwardRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';

import { NavItemProps } from '../types';
import { StyledItem, StyledIcon } from './styles';

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { title, path, icon, children, disabled, caption } = item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        <ListItemText
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            sx: {
              width: 72,
              fontSize: 10,
              lineHeight: '16px',
              textAlign: 'center',
              ...(active && {
                fontWeight: 'fontWeightMedium',
              }),
              ...(subItem && {
                fontSize: 14,
                width: 'auto',
                textAlign: 'left',
              }),
            },
          }}
        />

        {caption && (
          <Tooltip title={caption} arrow placement="right">
            <>{'(i)'}</>
          </Tooltip>
        )}

        {!!children && <>{'(i)'}</>}
      </StyledItem>
    );

    const renderItem = () => {
      // ExternalLink
      if (isExternalLink)
        return (
          <Link href={path} target="_blank" rel="noopener" underline="none">
            {renderContent}
          </Link>
        );

      // Default
      return (
        <Link component={NextLink} href={path} underline="none">
          {renderContent}
        </Link>
      );
    };

    return renderItem();
  },
);

NavItem.displayName = 'NavItem';

export default NavItem;
