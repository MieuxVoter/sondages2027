import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import JugMaj from "../../assets/jugement-majoritaire.svg?react";
import ScrutinUninominal from "../../assets/scrutin-uninominal.svg?react";
import VoteApprobation from "../../assets/vote-approbation.svg?react";

export const MobCommand: FC = () => {
  return (
    <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
      <BottomNavigation showLabels sx={{ bgcolor: 'transparent', '& .MuiBottomNavigationAction-root': { color: 'white' }, '& .Mui-selected': { color: 'white !important' } }}>
        <BottomNavigationAction
          label="Uninominal"
          icon={<ScrutinUninominal />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Approbation"
          icon={<VoteApprobation />}
          component={Link}
          to="/about"
        />
        <BottomNavigationAction
          label="J. Majoritaire"
          icon={<JugMaj />}
          component={Link}
          to="/info"
        />
      </BottomNavigation>
    </Paper>
  )
}