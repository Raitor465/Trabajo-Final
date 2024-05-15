import mongoose from "mongoose";

export type PartidaType = {
    player_id: Number,
    recursos:{
        agua: Number,
        comida: Number,
        chatarra: Number
    },
    terreno:{
        type: Record<string, number>
    }
}

const schema = new mongoose.Schema<PartidaType>({
    player_id: Number,
    recursos:{
        agua: Number,
        comida: Number,
        chatarra: Number
    },
    terreno:{
        type: Map,
        of: Number
    }
})

export default mongoose.models.Partidas || mongoose.model('Partidas', schema)