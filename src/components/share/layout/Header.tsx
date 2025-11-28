import { Link, useLocation } from '@tanstack/react-router'
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import logoSvg from '../../../assets/logo.svg'

export const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;


    const isActive = (path: string) => {
        if (path === '/majoritaire' && (currentPath === '/' || currentPath.startsWith('/majoritaire'))) return true;
        return currentPath.startsWith(path);
    };

    const NavButton = ({ to, label }: { to: string, label: string }) => (
        <Button
            component={Link}
            to={to}
            variant={isActive(to) ? 'contained' : 'outlined'}
            sx={{
                borderColor: isActive(to) ? 'primary.main' : 'divider',
                color: isActive(to) ? 'white' : 'text.primary',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                flexShrink: 0,
            }}
        >
            {label}
        </Button>
    );

    return (
        <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: 2,
                    py: 2
                }}>
                    {/* Brand */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: { md: 'auto' } }}>
                        <img src={logoSvg} alt="Mieux Voter" style={{ height: 32, width: 'auto' }} />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontFamily: 'DM Serif Display' }}>
                            sondages2027
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        width: { xs: '100%', md: 'auto' }
                    }}>
                        <NavButton to="/uninominal" label="Scrutin Uninominal" />
                        <NavButton to="/approbation" label="Vote par Approbation" />
                        <NavButton to="/majoritaire" label="Jugement Majoritaire" />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
