import mongoose from 'mongoose';

const localSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    vendedores: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    articulos: [
        {
        articulo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Articulo',
            required: true
        },
        stock: {
            type: Number,
            default: 0
        }
        }
    ]
}, {
    timestamps: true
});

export const Local = mongoose.model('Local', localSchema);
