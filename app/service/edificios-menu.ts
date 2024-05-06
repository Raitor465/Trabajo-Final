'use server'
export type Edificios = {
  id: number
  name: string
  descripcion: string
  imagen: any
}
const recursoList: Edificios[] = [
  { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: 'url(placeholders/pozo_ph.png)'},
  { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: 'url(placeholders/criadero_ph.png)'},
  { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: 'url(placeholders/chatarra_ph.png)'},
]

export const findEdificiosById = async (id: number) => {
  return recursoList.find(p => p.id === id)
}

export const findEdificiosByName = async (name: string) => {
  return recursoList.find(p => p.name === name)
}

export const getEdificiosList = async (): Promise<{ list: Edificios[] }> => {
    return { list: recursoList }; // Devolver la lista
  };