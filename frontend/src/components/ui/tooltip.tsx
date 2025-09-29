'use client'

import * as React from 'react'
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material'
import { styled } from '@mui/material/styles'

// Material-UI doesn't need a provider, so this is a passthrough component
function TooltipProvider({ children, ...props }: { children: React.ReactNode }) {
  return <>{children}</>
}

const StyledTooltip = styled(MuiTooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
    fontSize: '0.75rem',
    borderRadius: '6px',
    padding: '6px 12px',
    maxWidth: 'fit-content',
  },
  '& .MuiTooltip-arrow': {
    color: 'var(--primary)',
  },
}))

// Context to store tooltip content
const TooltipContext = React.createContext<{
  content: React.ReactNode
  setContent: (content: React.ReactNode) => void
}>({ content: null, setContent: () => {} })

// Tooltip wrapper that manages the content
function Tooltip({ children }: { children: React.ReactNode }) {
  const [content, setContent] = React.useState<React.ReactNode>(null)
  
  return (
    <TooltipContext.Provider value={{ content, setContent }}>
      {children}
    </TooltipContext.Provider>
  )
}

// Trigger component that applies the tooltip
function TooltipTrigger({ children }: { children: React.ReactNode }) {
  const { content } = React.useContext(TooltipContext)
  
  if (!content) {
    return <>{children}</>
  }
  
  return (
    <StyledTooltip title={content}>
      <span>{children}</span>
    </StyledTooltip>
  )
}

// Content component that sets the tooltip content
function TooltipContent({ children }: { children: React.ReactNode }) {
  const { setContent } = React.useContext(TooltipContext)
  
  React.useEffect(() => {
    setContent(children)
    return () => setContent(null)
  }, [children, setContent])
  
  return null
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
