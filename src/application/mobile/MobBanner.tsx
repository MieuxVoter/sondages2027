import type { FC } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import logoMiniSvg from '../../assets/logo-mini.svg'

export const MobBanner : FC = () => {
    return (
       <AppBar position="static" sx={{ zIndex: 1 }}>
        <Toolbar>
          <Box
            sx={{
              height: 32,
              width: 32,
              mr: 2,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0.5
            }}
          >
            <Box
              component="img"
              src={logoMiniSvg}
              alt="Logo"
              sx={{ height: 20, width: 20 }}
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JM Tracker - 2027
          </Typography>
        </Toolbar>
      </AppBar>

    )
}