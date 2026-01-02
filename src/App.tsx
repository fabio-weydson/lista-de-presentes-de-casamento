import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSupabase } from "./contexts/supabase.context";
import Home from "./components/Home";

import "./App.css";

const { REACT_APP_ACTIVE_EVENT_ID } = process.env;

function App() {
  const { supabase } = useSupabase();
  const [eventData, setEventData] = React.useState<any>(null);

  const fetchEventData = async () => {
    const { data, error } = await supabase
      .from("eventos")
      .select()
      .eq("id", REACT_APP_ACTIVE_EVENT_ID)
      .single();

    if (error) return console.error("Error fetching event data:", error);

    setEventData(data);
    document.body.style.backgroundColor = `${data.corPrincipal}`;
    document.body.style.backgroundImage = `url(${data.imagem})`;
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/construcao"
          element={
            <>
              <Container sx={{ p: 2, mt: 5, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  Em Construção
                </Typography>
                <Typography variant="body1">
                  Estamos trabalhando para trazer novidades em breve.
                </Typography>
              </Container>
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {eventData && (
                <>
                  <Home event={eventData} />
                  <div className="background-overlay"></div>
                </>
              )}{" "}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
