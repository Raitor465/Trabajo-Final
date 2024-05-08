'use server'
export type Recurso = {
  id: number
  name: string
  cantidad: number
}
const recursoList: Recurso[] = [
  { id: 1, name: 'Agua', cantidad: 500  },
  { id: 2, name: 'Comida', cantidad: 500 },
  { id: 3, name: 'Chatarra', cantidad: 500 },
]

export const findRecusoById = async (id: number) => {
  return recursoList.find(p => p.id === id)
}

export const findRecusoByName = async (name: string) => {
  return recursoList.find(p => p.name === name)
}

export const findRecusoByCantidad = async (cantidad: number) => {
    return recursoList.find(c => c.cantidad === cantidad)
  }

export const getRecursoList = async (): Promise<Recurso[] > => {
    return recursoList  // Devolver la lista
  };



//recursos.ts y edificios.ts