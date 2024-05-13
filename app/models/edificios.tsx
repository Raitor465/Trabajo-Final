import mongoose from "mongoose";

export type Edificio = {
    id: number;
    name: string;
    descripcion: string;
    imagen: string;
}

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    descripcion: String,
    imagen: String
})

const Edificios =  mongoose.model('Edificios', schema)

const defaultBuildings = [
    { id: 0, name: 'Base', descripcion: "", imagen: 'url(/placeholders/base_ph.png)'},
    { id: 1, name: 'Pozo', descripcion: "Recoleccion de agua", imagen: 'url(/placeholders/pozo_ph.png)'},
    { id: 2, name: 'Criadero', descripcion: "Matanza de ovejas radiactivas", imagen: 'url(/placeholders/criadero_ph.png)'},
    { id: 3, name: 'Chatarreria', descripcion: "Recoleccion de chatarra", imagen: 'url(/placeholders/chatarra_ph.png)' }
]

Edificios.insertMany(defaultBuildings)

export default Edificios;