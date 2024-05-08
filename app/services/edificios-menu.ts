'use server'
export type Edificios = {
  id: number
  name: string
  descripcion: string
  imagen: any
}
const edificiosList: Edificios[] = [
  { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: 'url(placeholders/pozo_ph.png)'},
  { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: 'url(placeholders/criadero_ph.png)'},
  { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: 'url(placeholders/chatarra_ph.png)'},
]

export const findEdificiosById = async (id: number) => {
  return edificiosList.find(p => p.id === id)
}

export const findEdificiosByName = async (name: string) => {
  return edificiosList.find(p => p.name === name)
}

export const getEdificiosList = async (): Promise<Edificios[]> => {
  // const data = await algoQueLlamaALaBd()
    return edificiosList; // Devolver la lista
  };