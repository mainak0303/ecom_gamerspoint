import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Container } from "@mui/material";
import { keyframes } from "@emotion/react";
import ComputerIcon from "@mui/icons-material/Computer";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import Loader from "@/layouts/header/Loader";


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutUsPage: React.FC = () =>
{
    const [ loading, setLoading ] = useState( true );

    useEffect( () =>
    {
       
        const timer = setTimeout( () =>
        {
            setLoading( false );
        }, 1500 ); 

        return () => clearTimeout( timer );
    }, [] );

    if ( loading )
    {
        return <Loader />;
    }

    return (
        <Box
            sx={ {
                minHeight: "100vh",
                background: "linear-gradient(to right, #ffcccc, #ff6666)",
                py: 4,
            } }
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={ 10 }
                    sx={ {
                        padding: { xs: 3, md: 6 },
                        borderRadius: 3,
                        background: "white",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                        animation: `${ fadeIn } 1s ease-out`,
                    } }
                >
                    {/* About Us Section */ }
                    <Box sx={ { mb: 4 } }>
                        <Typography
                            variant="h4"
                            sx={ { color: "#d32f2f", mb: 3, fontWeight: "bold" } }
                        >
                            ABOUT US
                        </Typography>

                        <Typography variant="body1" sx={ { mb: 3, lineHeight: 1.8 } }>
                            This is a web portal of GamERSPOiNT Private Limited, a
                            young and vibrant company that aims to provide good quality branded
                            IT products online.
                        </Typography>

                        <Typography variant="body1" sx={ { mb: 3, lineHeight: 1.8 } }>
                        GamERSPOiNT is one of the leading IT distribution companies in West
                            Bengal operating since its inception in 2025.
                        </Typography>

                        <Typography variant="body1" sx={ { mb: 3, lineHeight: 1.8 } }>
                            The company is heading to provide full range of PC components to
                            local customers through its wide sales channels.
                        </Typography>

                        <Typography variant="body1" sx={ { mb: 3, lineHeight: 1.8 } }>
                            To provide customers superior quality and well-known brand products
                            with best support & excellent after sale services are company's
                            motto.
                        </Typography>
                    </Box>

                    {/* Brand Partners Section */ }
                    <Box sx={ { mb: 4 } }>
                        <Typography variant="h6" sx={ { fontWeight: "bold", mb: 2 } }>
                            Authorized Dealer For:
                        </Typography>
                        <Grid container spacing={ 2 }>
                            { [
                                "AMD",
                                "ADATA",
                                "Antec",
                                "ASUS",
                                "ASRock",
                                "Cooler Master",
                                "Corsair",
                                "Deepcool",
                                "MSI",
                                "NZXT",
                                "Sapphire",
                                "ZOTAC",
                                "Dell",
                                "Gigabyte",
                                "HP",
                                "Intel",
                                "Lenovo",
                                "Logitech",
                                "Samsung",
                                "Seagate",
                                "Western Digital",
                            ].map( ( brand, index ) => (
                                <Grid item xs={ 6 } sm={ 4 } md={ 3 } key={ index }>
                                    <Box
                                        sx={ {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        } }
                                    >
                                        <ComputerIcon fontSize="small" color="error" />
                                        <Typography variant="body2">{ brand }</Typography>
                                    </Box>
                                </Grid>
                            ) ) }
                        </Grid>
                    </Box>

                    {/* Company Values Section */ }
                    <Grid container spacing={ 4 } sx={ { mb: 4 } }>
                        <Grid item xs={ 12 } md={ 6 }>
                            <Box
                                sx={ {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 3,
                                    height: "100%",
                                    borderRadius: 2,
                                    background: "#fff5f5",
                                } }
                            >
                                <StoreIcon fontSize="large" color="error" sx={ { mb: 2 } } />
                                <Typography variant="h6" sx={ { fontWeight: "bold", mb: 1 } }>
                                    Our Mission
                                </Typography>
                                <Typography variant="body2">
                                    Bringing the latest technologies with the best price
                                    performance combinations to our customers
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={ 12 } md={ 6 }>
                            <Box
                                sx={ {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 3,
                                    height: "100%",
                                    borderRadius: 2,
                                    background: "#fff5f5",
                                } }
                            >
                                <GroupsIcon fontSize="large" color="error" sx={ { mb: 2 } } />
                                <Typography variant="h6" sx={ { fontWeight: "bold", mb: 1 } }>
                                    Customer Satisfaction
                                </Typography>
                                <Typography variant="body2">
                                    We strive to achieve the highest level of Customer Satisfaction
                                    possible through superior buying experience
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default AboutUsPage;