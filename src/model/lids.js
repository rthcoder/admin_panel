import mongoose, { Schema } from "mongoose";

const lidsSchema = new mongoose.Schema({
    client_name: { type: String, required: true },
    client_number: { type: String, required: true },
    lid_created_at: { type: Date, default: Date.now }
})

export default mongoose.model("lids", lidsSchema)