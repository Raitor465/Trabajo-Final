import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: String,
    name: String
})

const Recursos = mongoose.model('Recursos', schema);

const defaultResources = [
    { id: 0, name: 'Agua' },
    { id: 1, name: 'Comida' },
    { id: 2, name: 'Chatarra' }
]

Recursos.insertMany(defaultResources)

export default Recursos;