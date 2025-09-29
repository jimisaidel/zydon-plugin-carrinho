import * as React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    minHeight: '36px',
    fontSize: '0.875rem',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease-in-out',
    
    '& fieldset': {
      borderColor: theme.palette.grey[300],
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    },
    
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },
    
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
    
    '&.Mui-error fieldset': {
      borderColor: theme.palette.error.main,
      boxShadow: `0 0 0 3px ${theme.palette.error.main}20`,
    },
    
    '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
  
  '& .MuiOutlinedInput-input': {
    padding: '8px 12px',
    fontSize: '0.875rem',
    
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    
    '&::selection': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
}));

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  type?: string
}

function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <StyledTextField
      type={type}
      variant="outlined"
      size="small"
      fullWidth
      className={className}
      {...props}
    />
  )
}

export { Input }
