'use server'
import { StaticImageData } from "next/image"
import pozoimg from "../componentes/images/placeholders/pozo_ph.png"
import criaimg from "../public/placeholders/criadero_ph.png"
//<<<<<<< funcionalidad-edificios
import chataimg from "../public/placeholders/chatarra_ph.png"
import { Recurso, actualizarRecurso, findRecursoByCantidad, findRecursoByName } from "./recursos"
//=======
import chataimg from '../public/placeholders/criadero_ph.png'

//>>>>>>> page-organizado-componentes

export type Edificios = {
  id: number
  name: string
  descripcion: string
  imagen: StaticImageData
  costoRecursos: Recurso[]
}
const edificiosList: Edificios[] = [
  { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: pozoimg, costoRecursos: [{id: 1, name: 'Agua', cantidad: 50 }, {id: 2, name: 'Comida', cantidad: 150 }, {id: 3, name: 'Chatarra', cantidad: 100 }] },
  { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: criaimg, costoRecursos: [{id: 1, name: 'Agua', cantidad: 100 }, {id: 2, name: 'Comida', cantidad: 50 }, {id: 3, name: 'Chatarra', cantidad: 200 }] },
  { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: chataimg, costoRecursos: [{id: 1, name: 'Agua', cantidad: 200 }, {id: 2, name: 'Comida', cantidad: 100 }, {id: 3, name: 'Chatarra', cantidad: 50 }] },
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