'use client'

import * as React from 'react'
import { FormLabel, FormLabelProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledLabel = styled(FormLabel)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.875rem',
  lineHeight: 1,
  fontWeight: 500,
  userSelect: 'none',
  color: 'var(--foreground)',
  '&.Mui-disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}))

interface LabelProps extends FormLabelProps {
  className?: string
}

function Label({ className, ...props }: LabelProps) {
  return (
    <StyledLabel
      className={className}
      {...props}
    />
  )
}

export { Label }
