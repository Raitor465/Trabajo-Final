import mongoose from "mongoose";

export type PartidaType = {
    player_id: number,
    recursos:{
        agua_jugador: number,
        comida_jugador: number,
        chatarra_jugador: number
    },
    terreno:{
        type: Record<string, number>
    }
}

const schema = new mongoose.Schema<PartidaType>({
    player_id: Number,
    recursos:{
        agua_jugador: Number,
        comida_jugador: Number,
        chatarra_jugador: Number
    },
    terreno:{
        type: Map,
        of: Number
    }
})
export default mongoose.models.Partidas || mongoose.model('Partidas', schema)