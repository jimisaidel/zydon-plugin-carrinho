import { Chip } from '@mui/material';

export const Badge = ({ children, variant, ...props }: any) => (
  <Chip 
    label={children} 
    variant={variant === 'outline' ? 'outlined' : 'filled'} 
    size="small"
    {...props} 
  />
);
