import { connectDB } from "@/app/libs/gamedb";
import Partidas from "@/app/models/partidas";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const partida = await Partidas.findOne({ id: id })
    return NextResponse.json(partida)
}