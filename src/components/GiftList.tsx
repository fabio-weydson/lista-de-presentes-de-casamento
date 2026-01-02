import { LinearProgress, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Typography, Container, Modal } from "@mui/material";
import  PaymentModal from "./PaymentModal";

import { useEffect, useState } from "react";
import { useSupabase } from "../contexts/supabase.context";

type GiftListProps = {
    event: any;
};

const GiftList = ({ event }: GiftListProps) => {
    const { supabase } = useSupabase();
    const [gifts, setGifts] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState<any>(null);

    useEffect(() => {
        const fetchGifts = async () => {
            const { data, error } = await supabase.from("itens").select(
                `
                id,
                titulo,
                valor,
                arrecadacoes: arrecadacoes (id, valor),
                imagem,
                link
                `
            ).eq("active", true).order("id", { ascending: false })
            .eq("evento_id", event.id);
            if (error) {
                console.error("Error fetching gifts:", error);
            } else {
                setGifts(data);
            }
            setLoading(false);
        };

        fetchGifts();
    }, []);

    if (loading) {
        return <LinearProgress />;
    }

    function handleGift(event: any, gift:any ) {
        setIsModalOpen(false);
        setSelectedGift(gift);
        event.preventDefault();
        setIsModalOpen(true);
    }

    function handleClose(): void {
        setIsModalOpen(false);
        setSelectedGift(null);
    }

    return (
        <>
        <List>
            {!loading && gifts.map((gift: any, index: number) => {
                const amountRaised = gift.arrecadacoes.reduce((acc: number, arrecadacao: any) => acc + arrecadacao.valor, 0);
                const progress = (amountRaised / gift.valor) * 100;

                return (
                    <Box key={gift.id} sx={{ p: 2 }}>
                        <ListItem 
                            sx={{ 
                                borderRadius: 2, 
                                display: "flex", 
                                alignItems: "center", 
                                flexDirection: { xs: "column", sm: "row" }, 
                                transition: "background-color 0.3s", 
                                '&:hover': { backgroundColor: "#FFF" }
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar 
                                    variant="rounded" 
                                    src={gift.imagem} 
                                    sx={{ 
                                        width: 250, 
                                        height: 230, 
                                        borderRadius: 2, 
                                        border: "3px solid rgb(220, 220, 220)", 
                                        filter: amountRaised >= gift.valor ? "grayscale(100%)" : "none",
                                        objectFit: "contain"
                                    }} 
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={gift.titulo}
                                secondary={`Arrecadado: R$${amountRaised} / Meta: R$${gift.valor}`}
                                sx={{ ml: { sm: 2 }, mt: { xs: 1, sm: 0 }, textAlign: { xs: "center", sm: "left" } }}
                            />
                            { (amountRaised >= gift.valor) ? 
                                <Container sx={{ ml: "auto", color: "#4caf50",  textAlign: { xs: "center", sm: "left" } }}>
                                    <Typography variant="h6">Meta atingida! 🤗</Typography>
                                </Container> 
                            :
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: { xs: 1, sm: 0 } }}>
                                    <LinearProgress variant="determinate" value={progress} sx={{ width: { xs: "100%", sm: 100 }, height: 8, borderRadius: 2, backgroundColor: "#e0e0e0", '& .MuiLinearProgress-bar': { backgroundColor: "#4caf50" } }} />
                                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                        <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: event.corPrincipal, '&:hover': { backgroundColor: event.corPrincipal } }}
                                            onClick={(event: any) => handleGift(event, gift)}
                                        >
                                            COLABORAR / PRESENTEAR
                                        </Button>
                                    </Box>
                                </Box>
                            }
                        </ListItem>
                        {index < gifts.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                );
            })}
        </List>
        <Box className="footer" sx={{ mt: 2, textAlign: "center", backgroundColor: "#ddd", p: 1, my: 0}}>
        <Typography variant="body2" color="textSecondary" align="center" >
            Lista atualizada todos os dias à meia-noite.
        </Typography>
        </Box>
        <Modal
              open={isModalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <PaymentModal gift={selectedGift} onClose={handleClose} />
            </Modal>
        
        </>
    );
};


export default GiftList;