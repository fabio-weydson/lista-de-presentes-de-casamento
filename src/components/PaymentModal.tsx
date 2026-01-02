import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Input, Tab, Tabs } from "@mui/material";
import { QrCodePix } from "qrcode-pix";
import { useSupabase } from "../contexts/supabase.context";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #ddd",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
};

interface PaymentModalProps {
  gift: any;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ gift, onClose }) => {
  const { supabase } = useSupabase();
  const [config, setConfig] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const fetchConfig = async () => {
    const { data } = await supabase.from("config").select().single();
    if (!data) {
      console.error("Error fetching config");
      return;
    }
    setConfig(data);
    return data;
  };

  useEffect(() => {
    const fetchPixCode = async () => {
      const config = await fetchConfig();
      if (!config) return;

      const code = QrCodePix({
        version: "01",
        key: config.chavePix,
        name: config.nomePix,
        city: config.cidadePix,
        message: `Presente #${gift.id}`,
        value: parseFloat(gift.id === 100 ? 0 : gift.valor),
      });

      setPixCode(await code.payload());
      setPixQrCode(await code.base64());
    };

    fetchPixCode();
    // eslint-disable-next-line
  }, []);

  if (!gift || !config) return null;

  return (
    <Box sx={boxStyle}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
      >
        {config.permitirPix && <Tab label="Pix" />}
        {config.permitirLoja && gift.link && <Tab label="Ou" disabled />}
        {config.permitirLoja && gift.link && <Tab label="Comprar" />}
      </Tabs>

      {tabIndex === 0 && config.permitirPix && (
        <Box mt={2}>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Para realizar o pagamento <b>parcial</b> ou <b>total</b>, use o QR Code abaixo:
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box flex={1} mb={2}>
              <img src={pixQrCode} alt="QR Code" width="100%" />
            </Box>
            <Box flex={1} mb={2} width="100%">
              <Input type="text" value={pixCode} readOnly fullWidth />
              <Button
                onClick={() => navigator.clipboard.writeText(pixCode)}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 1 }}
              >
                Copiar chave Pix
              </Button>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
              >
                Upload Comprovante
                <Input
                  type="file"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      alert("Agradecemos imensamente por sua colaboração! 🤗");
                      onClose();
                    }
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {tabIndex === 2 && gift.link && (
        <Box mt={2}>
          <Typography variant="body1" color="textSecondary" align="center" mb={2} gutterBottom>
            Você também pode optar por comprar o produto, clicando no link abaixo:
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            href={gift.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Comprar online
          </Button>
          <Typography variant="body1" color="textSecondary" align="center" mt={1}>
            <b>Endereço de envio:</b> {config.endereco}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentModal;