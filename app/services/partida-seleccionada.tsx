import partidas, { PartidaType } from "../models/partidas";

export const fetchSave = async (userId: number): Promise<PartidaType | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/saves/${userId}`);
    const data: PartidaType = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching partida:", error);
    return null;
  }
};

export const updateSave = async (data: PartidaType): Promise<PartidaType | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/saves/${data.player_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error actualizando partida: ${response.statusText}`);
    }

    const savedData: PartidaType = await response.json();
    return savedData;
  } catch (error) {
    console.error("Error posting partida:", error);
    return null;
  }
};