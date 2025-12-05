
import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { BorderLayout } from '../../share/component/layout/BorderLayout';
import { MobBanner } from './MobBanner';
import { MobCommand } from './MobCommand';

export function Mobile() {
  return (
    <BorderLayout sx={{ height: '100%' }}
      north={<MobBanner />}
      center={<Box sx={{ overflow: 'auto', height: '100%' }}><Outlet /></Box>}
      south={<MobCommand />}
    />
  )
}