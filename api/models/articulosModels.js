import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    tags: {
        type: [String],
        validate: {
        validator: Array.isArray,
        message: 'Tags debe ser un array'
    }
    },
    description: {
    type: String
    },
    price: {
    type: Number,
    required: true
    },
    size: {
    type: String
    },
    color: {
    type: String
    },
    stock: {
    type: Number,
    default: 0
    }
}, {
    timestamps: true
});

//
// Middleware - antes de guardar un nuevo artículo
//
articuloSchema.pre('save', function (next) {
    if (this.title) this.title = this.title.trim();
    if (this.description) this.description = this.description.trim();
    if (this.size) this.size = this.size.trim();
    if (this.color) this.color = this.color.trim();

    if (this.tags && Array.isArray(this.tags)) {
    this.tags = this.tags.map(tag => tag.toLowerCase().trim());
    }

    next();
});

//
// Middleware - antes de actualizar un artículo
//
articuloSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    if (update.title) update.title = update.title.trim();
    if (update.description) update.description = update.description.trim();
    if (update.size) update.size = update.size.trim();
    if (update.color) update.color = update.color.trim();

    if (update.tags && Array.isArray(update.tags)) {
    update.tags = update.tags.map(tag => tag.toLowerCase().trim());
    }

    this.setUpdate(update);
    next();
});

export default mongoose.model('Articulo', articuloSchema);

