import { ShoppingCart, Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    console.log("[v0] Tema atual:", theme)
    const newTheme = theme === "dark" ? "light" : "dark"
    console.log("[v0] Mudando para tema:", newTheme)
    setTheme(newTheme)
  }

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    color: theme.palette.text.primary
  }))

  const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1.5)
  }))

  if (!mounted) {
    return (
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LogoContainer>
              <ShoppingCart size={24} color="white" />
            </LogoContainer>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
              GC - Gestão de Carrinhos
            </Typography>
          </Box>
          <Box sx={{ width: 36, height: 36 }} />
        </Toolbar>
      </StyledAppBar>
    )
  }

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 }, py: 0.5, minHeight: { xs: 48, sm: 56 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <LogoContainer>
            <ShoppingCart size={24} color="white" />
          </LogoContainer>
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            GC - Gestão de Carrinhos
          </Typography>
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1rem',
              display: { xs: 'block', sm: 'none' }
            }}
          >
            GC
          </Typography>
        </Box>

        <IconButton
          onClick={toggleTheme}
          sx={{ 
            width: { xs: 32, sm: 36 }, 
            height: { xs: 32, sm: 36 },
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  )
}
