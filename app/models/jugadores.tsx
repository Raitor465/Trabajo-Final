import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: Number,
    recursos:{
        agua: {
            recurso_id: Number(0),
            cantidad: Number
        },
        comida: {
            recurso_id: Number(1),
            cantidad: Number
        },
        chatarra: {
            recurso_id: Number(2),
            cantidad: Number
        }
    },
    terreno: {
        pos0: {
            edificio_id: Number || null
        },
        pos1: {
            edificio_id: Number || null
        },
        pos2: {
            edificio_id: Number(0)
        },
        pos3: {
            edificio_id: Number || null
        },
        pos4: {
            edificio_id: Number || null
        }
    }
})

export default mongoose.model('Jugadores', schema)