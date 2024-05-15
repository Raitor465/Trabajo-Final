'use server'
export type Recurso = {
  id: number
  name: string
}
const recursoList: Recurso[] = [
  { id: 1, name: 'Agua'  },
  { id: 2, name: 'Comida' },
  { id: 3, name: 'Chatarra' },
]

export const findRecursoById = async (id: number) => {
  return recursoList.find(p => p.id === id)
}

export const findRecursoByName = async (name: string) => {
  return recursoList.find(p => p.name === name)
}

//<<<<<<< prueba-db
//=======
export const findRecursoByCantidad = async (cantidad: number) => {
    return recursoList.find(c => c.cantidad === cantidad)
  }

//>>>>>>> page-organizado-componentes
export const getRecursoList = async (): Promise<Recurso[] > => {
    return recursoList  // Devolver la lista
  };

export const actualizarRecurso = async (recursoActualizado: Recurso): Promise<void> => {
  const recursoExistente = await findRecursoByName(recursoActualizado.name); // Busca el recurso por nombre
  if (recursoExistente) {
    // Verifica si la cantidad después de la actualización será menor que cero
    if (recursoExistente.cantidad - recursoActualizado.cantidad < 0) {
      recursoExistente.cantidad = 0; // Establece la cantidad en cero
    } else {
      recursoExistente.cantidad -= recursoActualizado.cantidad; // Actualiza la cantidad del recurso
    }

    const index = recursoList.findIndex((recurso) => recurso.id === recursoExistente.id);
    if (index !== -1) {
      recursoList[index] = recursoExistente; // Actualiza el recurso en la lista
    } else {
      throw new Error('No se encontró el recurso para actualizar en la lista.');
    }
  } else {
    throw new Error('No se encontró el recurso para actualizar.');
  }
};

//recursos.ts y edificios.ts