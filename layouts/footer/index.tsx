import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () =>
{
    return (
        <Box
            component="footer"
            sx={ {
                background: 'linear-gradient(45deg, #8B0000, #FF0000)',
                color: '#FFD700',
                py: 3,
                mt: 'auto',
                boxShadow: '0 -4px 15px rgba(255, 0, 0, 0.5)',
            } }
        >
            <Container maxWidth="lg">
                <Typography variant="body1" align="center" sx={ { fontWeight: 'bold' } }>
                    © { new Date().getFullYear() } GamERSPOiNT Company. All rights reserved.
                </Typography>
                <Box sx={ { display: 'flex', justifyContent: 'center', gap: 2, mt: 1 } }>
                    <Link href="/" color="inherit" underline="none" sx={ { '&:hover': { color: '#FFFFFF' } } }>
                        Home
                    </Link>
                    <Link href="/cms/list" color="inherit" underline="none" sx={ { '&:hover': { color: '#FFFFFF' } } }>
                        Products
                    </Link>
                    <Link href="/aboutUs" color="inherit" underline="none" sx={ { '&:hover': { color: '#FFFFFF' } } }>
                        About Us
                    </Link>
                    <Link href="/contactUs" color="inherit" underline="none" sx={ { '&:hover': { color: '#FFFFFF' } } }>
                        Contact Us
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;