import React from 'react';
import './App.css';
import GiftList from './components/GiftList';
import { Container, Typography } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const {
  REACT_APP_EVENT_COUPLE_NAME,
  REACT_APP_EVENT_DATE = new Date().toISOString(),
  REACT_APP_EVENT_MAIN_COLOR
} = process.env;


const formatedDate = new Date(REACT_APP_EVENT_DATE).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

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
        <Container sx={{ p: 0, my: 0, maxWidth: 600, mt: 80, bgcolor: "#f5f5f5", borderTop: `5px solid ${REACT_APP_EVENT_MAIN_COLOR}` }}>
          <Typography variant="h5" align="center" sx={{ pt: 2 }}>
            <b>{REACT_APP_EVENT_COUPLE_NAME}</b>
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {formatedDate}
          </Typography>
          <Typography variant="h4" align="center" color={REACT_APP_EVENT_MAIN_COLOR} >
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
