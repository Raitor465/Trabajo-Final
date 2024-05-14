import mongoose from "mongoose";

export type Edificio = {
    id: number;
    name: string;
    descripcion: string;
    imagen: string;
}

const schema = new mongoose.Schema<Edificio>({
    id: Number,
    name: String,
    descripcion: String,
    imagen: String
})

export default mongoose.models.Edificios || mongoose.model('Edificios', schema);