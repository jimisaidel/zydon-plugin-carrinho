'use client'

import * as React from 'react'
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: '32px',
  height: '32px',
  flexShrink: 0,
}))

interface AvatarProps extends MuiAvatarProps {
  className?: string
}

function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <StyledAvatar
      className={className}
      {...props}
    >
      {children}
    </StyledAvatar>
  )
}

// Material-UI Avatar handles images directly via src prop
// This component is for compatibility with existing code
function AvatarImage({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  // This is a passthrough component since MUI Avatar handles images internally
  return null
}

// Material-UI Avatar handles fallbacks directly via children
// This component is for compatibility with existing code
function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // This is a passthrough component since MUI Avatar handles fallbacks internally
  return <>{children}</>
}

export { Avatar, AvatarImage, AvatarFallback }
