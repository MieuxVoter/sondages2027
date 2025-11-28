import { Box, Typography } from "@mui/material"

export const Footer = () => {
    return (
        <Box component="footer" className="mv-footer">
            <div className="mv-container mv-footer__inner">
                <Typography variant="body2" className="mv-footer__text">
                    © {new Date().getFullYear()} Mieux Voter — Démo graphique indépendante
                </Typography>
            </div>
        </Box>
    )
}
