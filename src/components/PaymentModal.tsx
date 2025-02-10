import React, { useEffect } from "react";
import { Box, Typography, Button, Modal, Input, Link } from "@mui/material";
import { useState } from "react";

var QRCode = require("../assets/img/qr-inter.jpg");

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #CCC',
    borderRadius: 5,
    boxShadow: 24,
    p: 2,
  };

interface PaymentModalProps {
    gift: any;
}

const PaymentModal = ({ gift }: PaymentModalProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
          <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h5">Pagamento via Pix</Typography>
                <Typography variant="body1">Para realizar o pagamento via Pix, utilize a o QR Code ou chave abaixo:</Typography>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <Box flex={1} mb={2}>
                    <img src={QRCode} alt="QR Code" width={'100%'} />
                  </Box>
                  <Box flex={1} mb={2}>
                    <Input type="text" value="00020101021126580014br.gov.bcb.pix013680364c43-127d-4042-8173-603ab92d4e0e5204000053039865802BR5922FABIO WEYDSON DA SILVA6007EUSEBIO62070503***6304F7FF" readOnly fullWidth />
                    <Button onClick={() => navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix013680364c43-127d-4042-8173-603ab92d4e0e5204000053039865802BR5922FABIO WEYDSON DA SILVA6007EUSEBIO62070503***6304F7FF")} variant="contained" color="primary" fullWidth>
                      Copiar chave Pix
                    </Button>
                  </Box>
                  <Box flex={1} alignContent={"center"} justifyContent={"center"}>
                    <Typography variant="body1">Você também pode optar por comprar o produto, clicando no link abaixo:</Typography>
                    <Button variant="contained" color="primary" fullWidth
                        href="https://www.mercadopago.com.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Link do Produto</Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </div>
    );
}

export default PaymentModal;