import mongoose, { Schema } from "mongoose";

const roleSchema = new mongoose.Schema({
    role_title: { type: String, required: true, unique: true },
    role_created_at: { type: Date, default: Date.now }
})

export default mongoose.model("roles", roleSchema)