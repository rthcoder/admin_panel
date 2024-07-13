import mongoose, { Schema } from "mongoose";

const partnersSchema = new mongoose.Schema({
    partner_title: { type: String, required: true, unique: true },
    about_partner: { type: String, required: true },
    img: { type: String, required: true },
    partner_created_at: { type: Date, default: Date.now }
})

export default mongoose.model("partners", partnersSchema)