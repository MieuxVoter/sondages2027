import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Link } from "@tanstack/react-router"
import type { FC } from "react"
import JugMaj from "../../assets/jugement-majoritaire.svg?react";
import VoteApprobation from "../../assets/vote-approbation.svg?react";
import ScrutinUninominal from "../../assets/scrutin-uninominal.svg?react";

export const AppCommand : FC = () => {
    return (
        <Paper sx={{ bgcolor: 'primary.main' }} elevation={3}>
        <BottomNavigation showLabels sx={{ bgcolor: 'transparent', '& .MuiBottomNavigationAction-root': { color: 'white' }, '& .Mui-selected': { color: 'white !important' } }}>
          <BottomNavigationAction
            label="Scrutin Uninominal"
            icon={<ScrutinUninominal />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Vote par Approbation"
            icon={<VoteApprobation />}
            component={Link}
            to="/about"
          />
          <BottomNavigationAction
            label="Jugement Majoritaire"
            icon={<JugMaj />}
            component={Link}
            to="/info"
          />
        </BottomNavigation>
      </Paper>
    )
}