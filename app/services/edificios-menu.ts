'use server'
import { StaticImageData } from "next/image"
import pozoimg from "../public/placeholders/pozo_ph.png"
import criaimg from "../public/placeholders/criadero_ph.png"
import chataimg from "../public/placeholders/chatarra_ph.png"


export type Edificios = {
  id: number
  name: string
  descripcion: string
  imagen: StaticImageData
}
const edificiosList: Edificios[] = [
  { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: pozoimg},
  { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: criaimg},
  { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: chataimg },
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