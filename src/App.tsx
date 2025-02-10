import React from 'react';
import './App.css';
import GiftList from './components/GiftList';
import { Container, Typography } from '@mui/material';

function App() {
  console.log("App.tsx");
  return (
    <>
      <Container sx={{ py: 4, maxWidth: 600, mt: 80, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5"  align="center">
            Filipa & Fábio
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
            08 de Março de 2025
        </Typography>
        <Typography variant="h4"  align="center">
            Lista de Presentes
        </Typography>
        <GiftList/>
      </Container>
      <div className="background-overlay"></div>
    </>
  );
}

export default App;
