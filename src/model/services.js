import mongoose, { Schema } from "mongoose";

const serviceSchema = new mongoose.Schema({
    service_title: { type: String, required: true, unique: true },
    about_service: { type: String, required: true },
    img: { type: String, required: true },
    service_created_at: { type: Date, default: Date.now }
})

export default mongoose.model("service", serviceSchema)