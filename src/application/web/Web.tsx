import { Outlet } from '@tanstack/react-router';

import {
  Box,
} from '@mui/material';
import { BorderLayout } from '../../share/component/layout/BorderLayout';
import { WebBanner } from './WebBanner';

export function Web() {
  return (
    <BorderLayout sx={{ height: '100%' }}
      north={<WebBanner />}
      center={<Box sx={{ overflow: 'auto', height: '100%' }}><Outlet /></Box>}
    />
  )
}