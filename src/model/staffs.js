import mongoose, { Schema } from "mongoose";

const staffSchema = new mongoose.Schema({
    staff_first_name: { type: String, required: true },
    staff_last_name: { type: String, required: true },
    staff_phone_number: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    img: { type: String, required: true},
    staff_role: { type: Schema.ObjectId, required: true, ref: 'roles'},
    staff_created_at: { type: Date, default: Date.now }
})

export default mongoose.model("staff", staffSchema)