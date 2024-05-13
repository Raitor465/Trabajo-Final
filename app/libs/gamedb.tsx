import mongoose from "mongoose";

export async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/tpfinal");
    //await mongoose.connect(process.env.MONGODB_URL ? process.env.MONGODB_URL : (() => { throw new Error("MONGODB_URL no definida"); })())
} 