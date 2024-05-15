import { useEffect, useState } from "react";
import { PartidaType } from "../models/partidas";

export const [partida, setPartida] = useState<PartidaType>();

useEffect(() => {
    const fetchSave = async () => {
      const response = await fetch('http://localhost:3000/api/saves/1000');
      const data: PartidaType = await response.json()
      setPartida(data)
    };
    fetchSave();
  }, []);