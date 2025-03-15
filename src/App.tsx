import React from 'react';
import './App.css';
import GiftList from './components/GiftList';
import { Container, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/construcao" element={<>
        <Container sx={{ p: 2, mt: 5, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Em Construção
          </Typography>
          <Typography variant="body1">
            Estamos trabalhando para trazer novidades em breve.
          </Typography>
        </Container>
      </>} />
      <Route path="/" element={
        <>
        <Container sx={{ p: 0, my: 0, maxWidth: 600, mt: 80, bgcolor: "#f3fff2", borderTop: "5px solid #40826D" }}>
          <Typography variant="h5" align="center" sx={{ pt: 2 }}>
            <b>Filipa & Fábio</b>
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            08 de Março de 2025
          </Typography>
          <Typography variant="h4" align="center" color='green' >
            Lista de Presentes
          </Typography>
          <GiftList/>
        </Container>
        <div className="background-overlay"></div>
        </>
      } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
