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

export const findRecusoById = async (id: number) => {
  return recursoList.find(p => p.id === id)
}

export const findRecusoByName = async (name: string) => {
  return recursoList.find(p => p.name === name)
}

export const getRecursoList = async (): Promise<Recurso[] > => {
    return recursoList  // Devolver la lista
  };



//recursos.ts y edificios.ts