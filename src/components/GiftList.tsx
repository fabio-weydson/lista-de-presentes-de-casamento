import React from "react";
import { LinearProgress, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Box, Typography, Container } from "@mui/material";
import  PaymentModal from "./PaymentModal";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `${process.env.REACT_APP_SUPABSE_URL}`;
const supabaseKey = `${process.env.REACT_APP_SUPABASE_KEY}`;
const supabase = createClient(supabaseUrl, supabaseKey);

const GiftList = () => {
    const [gifts, setGifts] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchGifts = async () => {
            const { data, error } = await supabase.from("itens").select(
                `
                id,
                titulo,
                valor,
                arrecadacoes: arrecadacoes (id, valor),
                imagem
                `
            );
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
        event.preventDefault();
        setIsModalOpen(true);
    }

    return (
        <>
        <List>
            {!loading && gifts.map((gift: any, index: number) => {
                const amountRaised = gift.arrecadacoes.reduce((acc: number, arrecadacao: any) => acc + arrecadacao.valor, 0);
                const progress = (amountRaised / gift.valor) * 100;
                console.log("amountRaised", amountRaised, progress);

                return (
                    <Box key={gift.id} sx={{ p: 2 }}>
                        <ListItem 
                            sx={{ 
                                borderRadius: 2, 
                                display: "flex", 
                                alignItems: "center", 
                                flexDirection: { xs: "column", sm: "row" }, 
                                transition: "background-color 0.3s", 
                                '&:hover': { backgroundColor: "#f5f5f5" }
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar 
                                    variant="rounded" 
                                    src={gift.imagem} 
                                    sx={{ 
                                        width: 200, 
                                        height: 200, 
                                        borderRadius: 2, 
                                        border: "3px solid rgb(220, 220, 220)", 
                                        filter: amountRaised >= gift.valor ? "grayscale(100%)" : "none" 
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
                                        <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: "#6ab869", '&:hover': { backgroundColor: "#346B58" } }}>
                                            COLABORAR
                                        </Button>
                                        <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: "#40826D", '&:hover': { backgroundColor: "#346B58" } }}
                                            onClick={(event) => handleGift(event, gift)}
                                        >
                                            PRESENTEAR
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
        {isModalOpen && (
            <PaymentModal gift={[]} />
        )}
        </>
    );
};


export default GiftList;