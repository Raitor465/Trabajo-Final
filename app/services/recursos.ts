'use server'
import { EdificioType } from "../models/edificios";
// type RecursoType = {
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
    // console.log(partidaActual)
    if (!partidaActual) {
      throw new Error('Partida no encontrada');
    }

    const recursos = partidaActual.recursos;
    if (!recursos) {
      throw new Error('Recursos no disponibles en la partida.');
    }

    const { agua_jugador, comida_jugador, chatarra_jugador }  = recursos;
    return { agua_jugador, comida_jugador, chatarra_jugador };
  } catch (error) {
    console.error("Error al obtener los recursos del jugador:", error);
    return null;
  }
};


export const actualizarRecursoJugador = async (recurso: { name: string, cantidad: number }): Promise<PartidaType | null> => {
  
  const partidaActual = await fetchSave(1000);
  if (!partidaActual) {
    throw new Error('No se encontró la partida del jugador.');
  }

  const recursos = partidaActual.recursos;
  if (!recursos) {
    throw new Error('Recursos no disponibles en la partida.');
  }

  if (partidaActual) {
    let recursoActualizado;
    switch (recurso.name) {
      case 'agua':
        recursoActualizado = recursos.agua_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.agua_jugador = recursoActualizado;
        break;
      case 'comida':
        recursoActualizado = recursos.comida_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.comida_jugador = recursoActualizado;
        break;
      case 'chatarra':
        recursoActualizado = recursos.chatarra_jugador - recurso.cantidad;
        if (recursoActualizado < 0) recursoActualizado = 0;
        recursos.chatarra_jugador = recursoActualizado;
        break;
      default:
        throw new Error('Recurso desconocido.');
    }
    //console.log(partidaActual)

    const updatePartida = await updateSave(partidaActual); // Guarda la partida actualizada en la base de datos
    //console.log(partidaActual)
    //window.location.reload();
    //const intervalId = setInterval(getRecursoList, 1000);
    if (!updatePartida){
      throw new Error("Error al actualizar la partida.")
    }
    // await getRecursoList()
    // console.log(partidaActual)
    return updatePartida;
    
  } else {
    throw new Error('No se encontró la partida del jugador.');
  }
};


//recursos.ts y edificios.ts