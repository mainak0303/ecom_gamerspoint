import React from "react";
import { Box, Typography, Paper, Button, Chip, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "@/layouts/header/Loader";
import { useProductDetailsQuery } from "@/customHooks/query/cms.query";
import BoltIcon from '@mui/icons-material/Bolt';

// Gaming-themed animations
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
  50% { text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000; }
  100% { text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const ProductDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useProductDetailsQuery(id as string);

  if (isLoading) return <Loader />;
  if (isError || !data?.status || !data?.data) {
    return (
      <Box textAlign="center" py={10} sx={{ background: 'radial-gradient(circle, #1a1a1a 0%, #000000 100%)', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ color: '#ff0000', animation: `${neonGlow} 2s infinite`, mb: 2 }}>
          ERROR 404
        </Typography>
        <Typography variant="h6" color="#ffffff" sx={{ mb: 4 }}>
          {isError ? "Failed to load product details" : "Product not found"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            background: 'linear-gradient(45deg, #ff0000 30%, #ff4500 90%)',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              animation: `${pulse} 1s infinite`,
              background: 'linear-gradient(45deg, #ff4500 30%, #ff0000 90%)'
            }
          }}
          onClick={() => router.back()}
        >
          RETURN TO PRODUCTS
        </Button>
      </Box>
    );
  }

  const product = data.data;

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "radial-gradient(circle,rgb(215, 206, 206) 0%,rgb(237, 89, 89) 100%)",
      py: 4,
      px: 2,
      color: "#ffffff"
    }}>
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header with back button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{
              color: '#ff0000',
              '&:hover': {
                animation: `${pulse} 1s infinite`,
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
              }
            }}
          >
            BACK TO PRODUCTS
          </Button>
        </Box>

        {/* Main Product Card */}
        <Paper sx={{
          background: 'linear-gradient(145deg,rgb(27, 25, 25) 0%, #1a1a1a 100%)',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)'
          }
        }}>
          {/* Product Header with Neon Effect */}
          <Box sx={{
            background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(255,69,0,0.3) 50%, rgba(255,0,0,0.1) 100%)',
            p: 3,
            borderBottom: '1px solid rgba(255, 0, 0, 0.3)'
          }}>
            <Typography variant="h3" sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              textAlign: 'center',
              animation: `${neonGlow} 2s infinite`,
              textTransform: 'uppercase'
            }}>
              {product.name}
            </Typography>
          </Box>

          {/* Product Content */}
          <Box sx={{ p: 4 }}>
            {/* Price */}
            <Box sx={{ mb: 4 }}>
              <Chip
                label={`$${product.price}`}
                sx={{
                  background: 'linear-gradient(45deg, #ff0000 30%, #ff4500 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  px: 2,
                  py: 1
                }}
              />
            </Box>

            {/* Category with Gaming Tag */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ color: '#aaaaaa', mb: 1 }}>
                CATEGORY
              </Typography>
              <Chip
                label={product.category}
                icon={<BoltIcon sx={{ color: '#ffd700' }} />}
                sx={{
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  color: '#00ffff',
                  fontWeight: 'bold'
                }}
              />
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 0, 0, 0.3)', my: 3 }} />

            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ 
                color: '#ff4500',
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
                <BoltIcon sx={{ mr: 1 }} /> SPECIFICATIONS
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#cccccc',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Paper>

        
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;