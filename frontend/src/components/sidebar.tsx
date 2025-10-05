import { useState, useEffect } from "react"
import { ShoppingCart, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react"
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material'
import { styled } from '@mui/material/styles'

// Mock useTheme hook for now
const useTheme = () => ({
  theme: 'light',
  setTheme: (theme: string) => console.log('Setting theme:', theme)
})

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: collapsed ? 64 : 256,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }))

  const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    marginRight: collapsed ? 0 : theme.spacing(1)
  }))

  return (
    <StyledDrawer
      variant="permanent"
      open={!collapsed}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LogoContainer>
              <ShoppingCart size={20} color="white" />
            </LogoContainer>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              GC - Gestão de Carrinhos
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          size="small"
          sx={{ ml: collapsed ? 0 : 'auto' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 1,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40, color: 'inherit' }}>
              <ShoppingCart size={20} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Carrinhos" />}
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {!collapsed && (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Tema
            </Typography>
          )}
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{ ml: collapsed ? 0 : 'auto' }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'action.selected' }}>
            <Typography variant="body2">U</Typography>
          </Avatar>
          {!collapsed && (
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Usuário
              </Typography>
              <Typography variant="caption" color="text.secondary">
                admin@ca.com
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </StyledDrawer>
  )
}
