import type { FC } from "react";
import { Link, useLocation } from '@tanstack/react-router'
import { Box, Toolbar, Typography, Tabs, Tab, Button, AppBar } from "@mui/material"
import logoSvg from '../../assets/logo.svg'

export const WebBanner : FC = () => {
  const location = useLocation();

  const getTabValue = (pathname: string) => {
    switch (pathname) {
      case '/majoritaire': return 0;
      case '/approbation': return 1;
      case '/uninominal': return 2;
      default: return 0;
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'primary.main' }}>
      <Toolbar variant="dense">
       <Box
          component="img"
          src={logoSvg}
          alt="Logo"
          sx={{ height: 50, width: 60, mr: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          Suivie des Candidats aux Elections - 2027
        </Typography>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
      </Toolbar>
      <Tabs
        value={getTabValue(location.pathname)}
        sx={{ bgcolor: 'white', borderColor: 'divider' }}
      >
        <Tab
          label="Jugement Majoritaire"
          component={Link}
          to="/majoritaire"
          sx={{ textTransform: 'none' }}
        />
        <Tab
          label="Vote par Approbation"
          component={Link}
          to="/approbation"
          sx={{ textTransform: 'none' }}
        />
        <Tab
          label="Scrutin Uninominal"
          component={Link}
          to="/uninominal"
          sx={{ textTransform: 'none' }}
        />
      </Tabs>
      
    </AppBar>
  )
}