
import { Outlet } from '@tanstack/react-router';
import { BorderLayout } from '../../share/component/layout/BorderLayout';
import { AppBanner } from './AppBanner';
import { AppCommand } from './AppCommand';
import { Box } from '@mui/material';

export function AppMobile() {
  return (
    <BorderLayout sx={{ height: '100%' }}
      north={<AppBanner />}
      center={<Box sx={{ overflow: 'auto', height: '100%' }}><Outlet/></Box>}
      south={<AppCommand />}
    />
    // <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    //   <AppBanner/> 
    //   <Box sx={{ flex: 1, display: 'flex'}}>
    //       <Outlet />
    //   </Box>

    //   <AppCommand></AppCommand>

    //   <TanStackRouterDevtools />
    // </Box>
  )
}