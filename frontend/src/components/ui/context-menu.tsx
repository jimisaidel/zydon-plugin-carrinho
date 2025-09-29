'use client'

import * as React from 'react'
import { Menu, MenuItem, MenuProps, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'

interface ContextMenuProps {
  children: React.ReactNode
}

function ContextMenu({ children }: ContextMenuProps) {
  return <>{children}</>
}

interface ContextMenuTriggerProps {
  children: React.ReactNode
  onContextMenu?: (event: React.MouseEvent) => void
}

function ContextMenuTrigger({ children, onContextMenu }: ContextMenuTriggerProps) {
  return (
    <div onContextMenu={onContextMenu}>
      {children}
    </div>
  )
}

function ContextMenuGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuSub({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuRadioGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

const StyledSubTrigger = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 8px',
  fontSize: '14px',
  cursor: 'default',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ContextMenuSubTriggerProps {
  children: React.ReactNode
  inset?: boolean
  onClick?: () => void
}

function ContextMenuSubTrigger({ children, inset, onClick }: ContextMenuSubTriggerProps) {
  return (
    <StyledSubTrigger onClick={onClick} style={{ paddingLeft: inset ? 32 : 8 }}>
      {children}
      <ChevronRightIcon style={{ marginLeft: 'auto', width: 16, height: 16 }} />
    </StyledSubTrigger>
  )
}

const StyledSubContent = styled(Menu)(({ theme }) => ({
  minWidth: '8rem',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  padding: '4px',
}));

interface ContextMenuSubContentProps {
  children: React.ReactNode
  open?: boolean
  anchorEl?: HTMLElement | null
  onClose?: () => void
}

function ContextMenuSubContent({ children, open, anchorEl, onClose }: ContextMenuSubContentProps) {
  return (
    <StyledSubContent
      open={open || false}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      {children}
    </StyledSubContent>
  )
}

const StyledContent = styled(Menu)(({ theme }) => ({
  minWidth: '8rem',
  maxHeight: '400px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  padding: '4px',
  overflowY: 'auto',
}));

interface ContextMenuContentProps {
  children: React.ReactNode
  open?: boolean
  anchorEl?: HTMLElement | null
  onClose?: () => void
  anchorPosition?: { top: number; left: number }
}

function ContextMenuContent({ children, open, anchorEl, onClose, anchorPosition }: ContextMenuContentProps) {
  return (
    <StyledContent
      open={open || false}
      anchorEl={anchorEl}
      anchorPosition={anchorPosition}
      anchorReference={anchorPosition ? 'anchorPosition' : 'anchorEl'}
      onClose={onClose}
    >
      {children}
    </StyledContent>
  )
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 8px',
  fontSize: '14px',
  cursor: 'default',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.destructive': {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light + '20',
    },
  },
}));

interface ContextMenuItemProps {
  children: React.ReactNode
  inset?: boolean
  variant?: 'default' | 'destructive'
  disabled?: boolean
  onClick?: () => void
}

function ContextMenuItem({ children, inset, variant = 'default', disabled, onClick }: ContextMenuItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      className={variant === 'destructive' ? 'destructive' : ''}
      style={{ paddingLeft: inset ? 32 : 8 }}
    >
      {children}
    </StyledMenuItem>
  )
}

interface ContextMenuCheckboxItemProps {
  children: React.ReactNode
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
}

function ContextMenuCheckboxItem({ children, checked, disabled, onClick }: ContextMenuCheckboxItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      style={{ paddingLeft: 32 }}
    >
      <span style={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
        {checked && <CheckIcon style={{ width: 16, height: 16 }} />}
      </span>
      {children}
    </StyledMenuItem>
  )
}

interface ContextMenuRadioItemProps {
  children: React.ReactNode
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
}

function ContextMenuRadioItem({ children, checked, disabled, onClick }: ContextMenuRadioItemProps) {
  return (
    <StyledMenuItem
      onClick={onClick}
      disabled={disabled}
      style={{ paddingLeft: 32 }}
    >
      <span style={{ position: 'absolute', left: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
        {checked && <CircleIcon style={{ width: 8, height: 8, fill: 'currentColor' }} />}
      </span>
      {children}
    </StyledMenuItem>
  )
}

const StyledLabel = styled('div')(({ theme }) => ({
  padding: '6px 8px',
  fontSize: '14px',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

interface ContextMenuLabelProps {
  children: React.ReactNode
  inset?: boolean
}

function ContextMenuLabel({ children, inset }: ContextMenuLabelProps) {
  return (
    <StyledLabel style={{ paddingLeft: inset ? 32 : 8 }}>
      {children}
    </StyledLabel>
  )
}

function ContextMenuSeparator() {
  return <Divider style={{ margin: '4px -4px' }} />
}

const StyledShortcut = styled('span')(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '12px',
  letterSpacing: '0.1em',
  color: theme.palette.text.secondary,
}));

interface ContextMenuShortcutProps {
  children: React.ReactNode
}

function ContextMenuShortcut({ children }: ContextMenuShortcutProps) {
  return (
    <StyledShortcut>
      {children}
    </StyledShortcut>
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
