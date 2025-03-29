import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, Container, Typography, keyframes } from "@mui/material";
import { useRouter } from "next/router";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const glow = keyframes`
  0% { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
  50% { text-shadow: 0 0 20px #ff0000, 0 0 30px #ff0000; }
  100% { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>GamERSPOiNT | Ultimate Gaming Hub</title>
        <meta name="description" content="Your premier gaming destination" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        
        
        <Box
          sx={{
            background: 'linear-gradient(to bottom, #1a1a1a, #000000)',
            color: '#fff',
            minHeight: 'calc(100vh - 64px)', 
            pt: 8,
            pb: 8,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 8,
                gap: 4,
              }}
            >
              <Box sx={{ maxWidth: 600 }}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: `${glow} 2s infinite`,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  WELCOME TO GamERSPOiNT
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: '#aaa' }}>
                  Your Ultimate Gaming Destination
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: '#ddd', fontSize: '1.1rem' }}>
                  Discover the latest gaming gear, accessories, and exclusive content curated for true gamers. 
                  Join our community and level up your gaming experience.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push('/cms/list')}
                    sx={{
                      background: 'linear-gradient(45deg, #8B0000, #FF0000)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF0000, #8B0000)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                    }}
                  >
                    Browse Products
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => router.push('/aboutUs')}
                    sx={{
                      color: '#FFD700',
                      borderColor: '#FFD700',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderColor: '#FFA500',
                        color: '#FFA500',
                      },
                      fontWeight: 'bold',
                    }}
                  >
                    About Us
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', md: '50%' },
                  animation: `${float} 6s ease-in-out infinite`,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Gaming Hero"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.5))',
                  }}
                />
              </Box>
            </Box>
          </Container>
          <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              sx={{
                mb: 6,
                fontWeight: 700,
                color: '#FFD700',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Why Choose Us
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
              textAlign: 'center',
            }}>
              {[
                {
                  title: 'Premium Products',
                  description: 'Top-quality gaming gear from leading brands'
                },
                {
                  title: 'Exclusive Deals',
                  description: 'Member-only discounts and early access'
                },
                {
                  title: 'Gaming Community',
                  description: 'Connect with fellow gamers worldwide'
                }
              ].map((feature, index) => (
                <Box key={index} sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(139, 0, 0, 0.2)' }}>
                  <Typography variant="h5" sx={{ mb: 2, color: '#FFD700' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ddd' }}>
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </div>
    </>
  );
}