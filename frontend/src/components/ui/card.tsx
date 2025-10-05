import * as React from 'react'
import { Card as MuiCard, Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  borderRadius: 12,
  padding: theme.spacing(3),
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.paper,
}));

const StyledCardHeader = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  alignItems: 'start',
  gap: theme.spacing(0.75),
  paddingLeft: 0,
  paddingRight: 0,
  '&[data-has-action="true"]': {
    gridTemplateColumns: '1fr auto',
  },
  '&.border-b': {
    paddingBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
}));

const StyledCardTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1,
  fontWeight: 600,
  fontSize: '1.125rem',
  color: theme.palette.text.primary,
}));

const StyledCardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const StyledCardAction = styled(Box)(() => ({
  gridColumn: 2,
  gridRow: '1 / 3',
  alignSelf: 'start',
  justifySelf: 'end',
}));

const StyledCardContent = styled(Box)(() => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const StyledCardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 0,
  paddingRight: 0,
  '&.border-t': {
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
}));

function Card({ className, ...props }: React.ComponentProps<typeof StyledCard>) {
  return (
    <StyledCard
      className={className}
      {...props}
    />
  )
}

function CardHeader({ className, children, ...props }: React.ComponentProps<typeof StyledCardHeader>) {
  const hasAction = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === CardAction
  );
  
  return (
    <StyledCardHeader
      className={className}
      data-has-action={hasAction}
      {...props}
    >
      {children}
    </StyledCardHeader>
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof StyledCardTitle>) {
  return (
    <StyledCardTitle
      className={className}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<typeof StyledCardDescription>) {
  return (
    <StyledCardDescription
      className={className}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<typeof StyledCardAction>) {
  return (
    <StyledCardAction
      className={className}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<typeof StyledCardContent>) {
  return (
    <StyledCardContent
      className={className}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof StyledCardFooter>) {
  return (
    <StyledCardFooter
      className={className}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
