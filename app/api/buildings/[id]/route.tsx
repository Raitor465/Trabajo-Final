import { connectDB } from "@/app/libs/gamedb";
import Edificios from "@/app/models/edificios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: Params}) {
    const { id }= params
    await connectDB()
    const edificio = await Edificios.findOne({ id: id })
    return NextResponse.json(edificio)
}