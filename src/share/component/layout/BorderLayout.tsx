import React, { type ReactNode } from 'react';
import "./BorderLayout.scss";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material";

interface BorderLayoutProps {
  north?: ReactNode;
  west?: ReactNode;
  center?: ReactNode;
  east?: ReactNode;
  south?: ReactNode;
  sx?: SxProps;
}

export const BorderLayout: React.FC<BorderLayoutProps> = ({
  north,
  south,
  west,
  east,
  center,
  sx,
}) => {
  return (
    <Box className="border-layout" sx={{ ...sx }}>
      <div className="north">{north}</div>
      <div className="west">{west}</div>
      <div className="center">{center}</div>
      <div className="east">{east}</div>
      <div className="south">{south}</div>
    </Box>
  );
};
