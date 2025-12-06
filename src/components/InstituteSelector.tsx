import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import type { FC } from "react";

export interface Institute {
    id: string;
    name: string;
    subtitle: string;  // The newspaper/publication that commissions the poll
    available: boolean;
}

interface InstituteSelectorProps {
    institutes: Institute[];
    selectedInstitute: string;
    onSelect: (instituteId: string) => void;
}

const defaultInstitutes: Institute[] = [
    { id: 'ipsos', name: 'IPSOS', subtitle: 'La Tribune Dimanche', available: true },
    { id: 'elabe', name: 'ELABE', subtitle: 'Les Échos', available: false },
    { id: 'ifop', name: 'IFOP', subtitle: 'Paris Match / Sud Radio', available: false },
];

export const InstituteSelector: FC<InstituteSelectorProps> = ({
    institutes = defaultInstitutes,
    selectedInstitute,
    onSelect,
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 4 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Institut de sondage
            </Typography>
            <ButtonGroup variant="outlined" size="large">
                {institutes.map((institute) => (
                    <Button
                        key={institute.id}
                        onClick={() => institute.available && onSelect(institute.id)}
                        disabled={!institute.available}
                        variant={selectedInstitute === institute.id ? 'contained' : 'outlined'}
                        sx={{
                            textTransform: 'none',
                            fontWeight: selectedInstitute === institute.id ? 700 : 400,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            py: 1.5,
                            px: 3,
                            lineHeight: 1.2,
                        }}
                    >
                        <span style={{ fontSize: '1rem' }}>{institute.name}</span>
                        <span style={{
                            fontSize: '0.7rem',
                            opacity: 0.7,
                            fontWeight: 400,
                            marginTop: 2
                        }}>
                            {institute.subtitle}
                        </span>
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export { defaultInstitutes };
