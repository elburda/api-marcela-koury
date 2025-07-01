import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);
