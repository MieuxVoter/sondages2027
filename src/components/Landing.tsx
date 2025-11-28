import { Box, Button, Container, Typography, Card, CardContent, alpha } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { keyframes } from "@mui/system";
import { useState, useEffect } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
`;

export const Landing = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                height: '100vh',
                overflow: 'hidden',
                background: `linear-gradient(135deg, 
          ${alpha('#2400FD', 0.05)} 0%, 
          ${alpha('#0A004C', 0.08)} 50%,
          ${alpha('#2400FD', 0.05)} 100%)`,
                position: 'relative',
            }}
        >
            {/* Animated background elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#2400FD', 0.1)} 0%, transparent 70%)`,
                    transform: `translate(${(mousePosition.x - 50) * 0.5}px, ${(mousePosition.y - 50) * 0.5}px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#0A004C', 0.08)} 0%, transparent 70%)`,
                    transform: `translate(${(mousePosition.x - 50) * -0.4}px, ${(mousePosition.y - 50) * -0.4}px)`,
                    transition: 'transform 0.2s ease-out',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '100vh', overflowY: 'auto' }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        pt: { xs: 8, md: 12 },
                        pb: { xs: 6, md: 8 },
                        textAlign: 'center',
                        animation: `${fadeInUp} 0.8s ease-out`,
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                            fontWeight: 800,
                            fontFamily: 'DM Serif Display',
                            background: 'linear-gradient(135deg, #2400FD 0%, #0A004C 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            lineHeight: 1.1,
                        }}
                    >
                        Sondages 2027
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            mb: 4,
                            fontSize: { xs: '1rem', md: '1.2rem' },
                        }}
                    >
                        par Mieux Voter
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            color: 'text.secondary',
                            mb: 6,
                            maxWidth: '800px',
                            mx: 'auto',
                            fontSize: { xs: '1rem', md: '1.5rem' },
                            fontWeight: 400,
                        }}
                    >
                        Explorez les intentions de vote pour l'élection présidentielle 2027
                        à travers différentes méthodes de scrutin
                    </Typography>

                    {/* CTA Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mb: 8,
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate({ to: '/majoritaire' })}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: '999px',
                                textTransform: 'none',
                                boxShadow: `0 8px 24px ${alpha('#2400FD', 0.25)}`,
                                '&:hover': {
                                    boxShadow: `0 12px 32px ${alpha('#2400FD', 0.35)}`,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Explorer maintenant
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate({ to: '/majoritaire' })}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: '999px',
                                textTransform: 'none',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            En savoir plus
                        </Button>
                    </Box>
                </Box>

                {/* Feature Cards */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                        pb: 8,
                    }}
                >
                    {[
                        {
                            icon: <HowToVoteIcon sx={{ fontSize: 40 }} />,
                            title: 'Jugement Majoritaire',
                            description: 'Une méthode innovante où chaque électeur attribue une mention à chaque candidat',
                            onClick: () => navigate({ to: '/majoritaire' }),
                            delay: '0.2s',
                        },
                        {
                            icon: <BarChartIcon sx={{ fontSize: 40 }} />,
                            title: 'Vote Uninominal',
                            description: 'Le système traditionnel basé sur un seul tour de vote',
                            onClick: () => navigate({ to: '/uninominal' }),
                            delay: '0.4s',
                        },
                        {
                            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                            title: 'Vote par Approbation',
                            description: 'Approuvez autant de candidats que vous le souhaitez',
                            onClick: () => navigate({ to: '/approbation' }),
                            delay: '0.6s',
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            onClick={feature.onClick}
                            sx={{
                                cursor: 'pointer',
                                animation: `${fadeInUp} 0.8s ease-out`,
                                animationDelay: feature.delay,
                                animationFillMode: 'backwards',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 16px 40px ${alpha('#000', 0.12)}`,
                                    '& .feature-icon': {
                                        transform: 'scale(1.1) rotate(5deg)',
                                        color: 'primary.main',
                                    },
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    className="feature-icon"
                                    sx={{
                                        color: 'primary.main',
                                        mb: 2,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        fontFamily: 'DM Serif Display',
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.6 }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Stats Section */}
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 6,
                        borderTop: `1px solid ${alpha('#000', 0.06)}`,
                        animation: `${pulse} 3s ease-in-out infinite`,
                    }}
                >
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                    >
                        Données en temps réel basées sur les derniers sondages.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
