import { Container, Typography } from '@mui/material';
import GiftList from './GiftList';
import { formatDate } from '../utils';

interface HomeProps {
    event: {
        titulo: string;
        data: string;
        corPrincipal: string;
        imagem: string;
    };
}

const Home = ({ event }: HomeProps) => {
    return (
        <Container sx={{ p: 0, my: 0, maxWidth: 600, mt: 80, bgcolor: "#f5f5f5", borderTop: `5px solid ${event.corPrincipal}` }}>
          <Typography variant="h5" align="center" sx={{ pt: 2 }}>
            <b>{event.titulo}</b>
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {formatDate(event.data)}
          </Typography>
          <Typography variant="h4" align="center" color={event.corPrincipal} >
            Lista de Presentes
          </Typography>
          <GiftList event={event} />
        </Container>
    );
};

export default Home;