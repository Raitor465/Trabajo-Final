'use server'
// export type Recurso = {
//   id: number
//   name: string
// }
// const recursoList: Recurso[] = [
//   { id: 1, name: 'Agua'  },
//   { id: 2, name: 'Comida' },
//   { id: 3, name: 'Chatarra' },
// ]

// export const findRecursoById = async (id: number) => {
//   return recursoList.find(p => p.id === id)
// }

// export const findRecursoByName = async (name: string) => {
//   return recursoList.find(p => p.name === name)
// }


// export const getRecursoList = async (): Promise<Recurso[] > => {
//     return recursoList  // Devolver la lista
//   };

  //////////dasdadasd
import Partidas from "../models/partidas";

export const getRecursoList = async (playerId: number): Promise<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number } | null> => {
  try {
    const partida = await Partidas.findOne({ player_id: playerId });

    if (partida) {
      const { agua_jugador, comida_jugador, chatarra_jugador } = partida.recursos;
      return { agua_jugador, comida_jugador, chatarra_jugador };
    } else {
      console.error("No se encontró la partida del jugador.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los recursos del jugador:", error);
    return null;
  }
};

export const actualizarRecursoJugador = async (playerId: number, recurso: { name: string, cantidad: number }): Promise<void> => {
  const partida = await Partidas.findOne({ player_id: playerId });

  if (partida) {
    let recursoActualizado;
    switch (recurso.name) {
      case 'agua':
        recursoActualizado = partida.recursos.agua_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partida.recursos.agua_jugador = recursoActualizado;
        break;
      case 'comida':
        recursoActualizado = partida.recursos.comida_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partida.recursos.comida_jugador = recursoActualizado;
        break;
      case 'chatarra':
        recursoActualizado = partida.recursos.chatarra_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partida.recursos.chatarra_jugador = recursoActualizado;
        break;
      default:
        throw new Error('Recurso desconocido.');
    }

    await partida.save(); // Guarda la partida actualizada en la base de datos
  } else {
    throw new Error('No se encontró la partida del jugador.');
  }
};

//recursos.ts y edificios.ts