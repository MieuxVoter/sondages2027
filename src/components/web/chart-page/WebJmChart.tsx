import type { FC, PropsWithChildren } from "react"

import { Box, Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "@tanstack/react-router"

interface WebJmChartProps {

}

export const WebJmChart: FC<PropsWithChildren<WebJmChartProps>> = ({ children }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: 1, height: 1, p: 4, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {children}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate({ to: '/majoritaire' })}
                    className="mv-btn mv-btn--primary"
                    sx={{ borderRadius: '999px', textTransform: 'none' }} // Match mv-btn--pill style if possible, or just use className
                >
                    Retour
                </Button>
            </Box>
        </Box>
    )
}