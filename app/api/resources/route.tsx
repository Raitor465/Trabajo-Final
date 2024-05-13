import { connectDB } from "@/app/libs/gamedb";
import Recursos from "@/app/models/recursos";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()

    const recursos = await Recursos.find()
    return NextResponse.json(recursos)
}
