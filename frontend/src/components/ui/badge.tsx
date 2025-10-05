import { Chip, ChipProps } from '@mui/material'
import { styled } from '@mui/material/styles'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

const StyledBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<{ customVariant?: BadgeVariant }>(({ customVariant = 'default' }) => {
  const baseStyles = {
    height: 'auto',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '6px',
    '& .MuiChip-label': {
      padding: 0,
    },
  }

  const variantStyles = {
    default: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
      border: 'none',
      '&:hover': {
        backgroundColor: 'var(--primary)',
        opacity: 0.9,
      },
    },
    secondary: {
      backgroundColor: 'var(--secondary)',
      color: 'var(--secondary-foreground)',
      border: 'none',
      '&:hover': {
        backgroundColor: 'var(--secondary)',
        opacity: 0.9,
      },
    },
    destructive: {
      backgroundColor: 'var(--destructive)',
      color: 'var(--destructive-foreground)',
      border: 'none',
      '&:hover': {
        backgroundColor: 'var(--destructive)',
        opacity: 0.9,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
      '&:hover': {
        backgroundColor: 'var(--accent)',
        color: 'var(--accent-foreground)',
      },
    },
  }

  return {
    ...baseStyles,
    ...variantStyles[customVariant as keyof typeof variantStyles],
  }
})

interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: BadgeVariant
  asChild?: boolean
}

function Badge({ variant = 'default', asChild, children, ...props }: BadgeProps) {
  return (
    <StyledBadge
      customVariant={variant}
      label={children}
      {...props}
    />
  )
}

export { Badge }
