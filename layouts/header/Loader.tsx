import React from 'react';
import { keyframes } from '@emotion/react';
import { Box, CircularProgress } from '@mui/material';

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000;
  }
  50% {
    box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 80px #ff0000;
  }
  100% {
    box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 20px #ff0000;
  }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: '#FF0000',
          animation: `${glow} 2s infinite`,
          '& circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    </Box>
  );
};

export default Loader; 