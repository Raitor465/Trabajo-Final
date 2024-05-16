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
import { PartidaType } from "../models/partidas";
import { fetchSave, updateSave } from "./partida-seleccionada"; 

export const getRecursoList = async (): Promise<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number } | null> => {
  try {
    const partidaActual = await fetchSave(1000);
    if (!partidaActual) {
      throw new Error('Partida no encontrada');
    }

    const { agua_jugador, comida_jugador, chatarra_jugador } = partidaActual.recursos;
    return { agua_jugador, comida_jugador, chatarra_jugador };
  } catch (error) {
    console.error("Error al obtener los recursos del jugador:", error);
    return null;
  }
};


export const actualizarRecursoJugador = async (recurso: { name: string, cantidad: number }): Promise<void> => {
  
  const partidaActual = await fetchSave(1000);

  if (partidaActual) {
    let recursoActualizado;
    switch (recurso.name) {
      case 'agua':
        recursoActualizado = partidaActual.recursos.agua_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partidaActual.recursos.agua_jugador = recursoActualizado;
        break;
      case 'comida':
        recursoActualizado = partidaActual.recursos.comida_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partidaActual.recursos.comida_jugador = recursoActualizado;
        break;
      case 'chatarra':
        recursoActualizado = partidaActual.recursos.chatarra_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        partidaActual.recursos.chatarra_jugador = recursoActualizado;
        break;
      default:
        throw new Error('Recurso desconocido.');
    }

    await updateSave(partidaActual); // Guarda la partida actualizada en la base de datos
  } else {
    throw new Error('No se encontró la partida del jugador.');
  }
};

//recursos.ts y edificios.ts