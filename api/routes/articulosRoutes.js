import express from "express";
import {
    addArticulo,
    listArticulos,
    getArticuloById,
    searchByTag,
    updateArticulo,
    deleteArticulo
} from "../controllers/articulosControllers.js";

const router = express.Router();

router.get('/', listArticulos);
router.post('/', addArticulo);
router.get('/search/tags', searchByTag);
router.get('/:id', getArticuloById);
router.put('/:id', updateArticulo);
router.delete('/:id', deleteArticulo);

export default router;

