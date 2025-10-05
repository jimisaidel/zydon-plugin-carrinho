import * as React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'customSize',
})<{ customVariant?: ButtonVariant; customSize?: ButtonSize }>(({ theme, customVariant, customSize }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  minWidth: 'auto',
  transition: 'all 0.2s ease-in-out',
  
  // Size variants
  ...(customSize === 'sm' && {
    padding: '4px 12px',
    fontSize: '0.875rem',
    minHeight: '32px',
    gap: '6px',
  }),
  ...(customSize === 'lg' && {
    padding: '8px 24px',
    fontSize: '1rem',
    minHeight: '40px',
    gap: '8px',
  }),
  ...(customSize === 'icon' && {
    padding: '8px',
    minWidth: '36px',
    width: '36px',
    height: '36px',
  }),
  ...(customSize === 'default' && {
    padding: '8px 16px',
    minHeight: '36px',
    gap: '8px',
  }),

  // Variant styles
  ...(customVariant === 'default' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    },
  }),
  ...(customVariant === 'destructive' && {
    backgroundColor: theme.palette.error.main,
    color: '#ffffff',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  ...(customVariant === 'outline' && {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  }),
  ...(customVariant === 'secondary' && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  }),
  ...(customVariant === 'ghost' && {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
    },
  }),
  ...(customVariant === 'link' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    padding: 0,
    minHeight: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    },
  }),

  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    '& > svg': {
      width: '16px',
      height: '16px',
    },
  },
}));

function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    // For asChild functionality, clone the child element with button props
    return React.cloneElement(children, {
      ...props,
      ...children.props,
    })
  }

  return (
    <StyledButton
      customVariant={variant}
      customSize={size}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

// Export buttonVariants for compatibility with other components
export const buttonVariants = (props?: { variant?: ButtonVariant | string, size?: ButtonSize }) => {
  const { variant = 'default', size = 'default' } = props || {}
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  }
  
  const variantClass = variants[variant as ButtonVariant] || variants.default
  const sizeClass = sizes[size as ButtonSize] || sizes.default
  
  return `${variantClass} ${sizeClass}`
}

export { Button }
