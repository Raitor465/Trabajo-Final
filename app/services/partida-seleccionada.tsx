import { EdificioType } from "../models/edificios";
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

export const fetchSaveEdificios = async (): Promise<EdificioType[] | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/buildings`);
    const data: EdificioType[] = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching Edificios:", error);
    return null;
  }
};

// Esta función actualiza un edificio en la base de datos
export const actualizarEdificio = async (edificioId: number, newData: Partial<EdificioType>): Promise<boolean> => {
  try {
    // Hacer la solicitud para actualizar el edificio en la base de datos (por ejemplo, mediante una API)
    const response = await fetch(`http://localhost:3000/api/buildings/${edificioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error(`Error actualizando el edificio: ${response.statusText}`);
    }

    return true; // Indicar que la actualización fue exitosa
  } catch (error) {
    console.error("Error al actualizar el edificio:", error);
    return false; // Indicar que la actualización falló
  }
};



export const updateSave = async (data: PartidaType): Promise<PartidaType | null> => {
  try {
    //console.log(data)
    const player_id = data.player_id
    const response = await fetch(`http://localhost:3000/api/saves/1000`, {
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