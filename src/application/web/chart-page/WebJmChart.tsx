import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import type { FC, PropsWithChildren } from "react"
import { BorderLayout } from "../../../share/component/layout/BorderLayout"

interface WebJmChartProps {

}

export const WebJmChart: FC<PropsWithChildren<WebJmChartProps>> = ({ children }) => {
    const navigate = useNavigate()
    return (
        <BorderLayout sx={{ width: 1, height: 1, p: 4 }}
            center={children}
            south={
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate({ to: '/majoritaire' })}
                    >
                        Retour
                    </Button>
                </Box>
            }
        />
    )
}