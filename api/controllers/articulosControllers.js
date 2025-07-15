import articulosModels from '../models/articulosModels.js';
import { articulosValidation } from '../validation/validation.js';

// Crear artículo
export const addArticulo = async (req, res) => {
    const { error } = articulosValidation(req.body);
    if (error) return res.status(400).json({ error });

    try {
        const articulo = new articulosModels({ ...req.body });
        const nuevoArticulo = await articulo.save();
        res.status(201).json(nuevoArticulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar artículos con paginación y filtro por título opcional
export const listArticulos = async (req, res) => {
    try {
        const { page = 1, limit = 10, title } = req.query;
        const filtro = {};

        if (title) {
        filtro.title = { $regex: new RegExp(title, 'i') };
        }

        const articulos = await articulosModels
        .find(filtro)
        .skip((page - 1) * limit)
        .limit(Number(limit));

        const total = await articulosModels.countDocuments(filtro);

        res.json({
        total,
        page: Number(page),
        limit: Number(limit),
        data: articulos
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar artículo por ID
export const getArticuloById = async (req, res) => {
    try {
        const articulo = await articulosModels.findById(req.params.id);
        if (!articulo) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json(articulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar artículos por tags
export const searchByTag = async (req, res) => {
    try {
        if (!req.query.tags) {
        return res.status(400).json({ error: "Debes enviar tags en la query" });
        }

        const tags = req.query.tags.split(',');
        const articulos = await articulosModels.find({ tags: { $in: tags } });
        res.json(articulos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar por título con opciones de coincidencia
export const searchByTitle = async (req, res) => {
    try {
        const { title, type = 'contains' } = req.query;

        if (!title) return res.status(400).json({ error: 'Falta el parámetro title' });

        let regex;
        switch (type) {
        case 'exact':
            regex = new RegExp(`^${title}$`, 'i');
            break;
        case 'contains':
            regex = new RegExp(title, 'i');
            break;
        case 'startsWith':
            regex = new RegExp(`^${title}`, 'i');
            break;
        case 'endsWith':
            regex = new RegExp(`${title}$`, 'i');
            break;
        default:
            return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
        }

        const articulos = await articulosModels.find({ title: { $regex: regex } });
        res.json(articulos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar artículo
export const updateArticulo = async (req, res) => {
    try {
        const articuloActualizado = await articulosModels.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!articuloActualizado) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json(articuloActualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar artículo
export const deleteArticulo = async (req, res) => {
    try {
        const articuloEliminado = await articulosModels.findByIdAndDelete(req.params.id);
        if (!articuloEliminado) {
        return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json(articuloEliminado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
