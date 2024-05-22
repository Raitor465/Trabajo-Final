import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSave } from '../../services/partida-seleccionada';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const partidaActual = await fetchSave(1000);
    if (!partidaActual) {
      throw new Error('Partida no encontrada');
    }

    const recursos = partidaActual.recursos;
    if (!recursos) {
      throw new Error('Recursos no disponibles en la partida.');
    }

    const { agua_jugador, comida_jugador, chatarra_jugador } = recursos;
    res.status(200).json({ agua_jugador, comida_jugador, chatarra_jugador });
  } catch (error) {
    console.error("Error al obtener los recursos del jugador:", error);
    res.status(500).json({ error: 'Error al obtener los recursos del jugador' });
  }
}