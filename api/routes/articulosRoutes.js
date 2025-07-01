import express from "express"
import { addArticulo, listArticulos, getArticuloById, searchByTag, updateArticulo, deleteArticulo} from "../controllers/articulosControllers.js";
const articulosRouter = express.Router();


articulosRouter.get('/', listArticulos)
articulosRouter.post('/',addArticulo)
articulosRouter.get('/search/tags',searchByTag)
articulosRouter.get('/:id',getArticuloById)
articulosRouter.put('/:id',updateArticulo)
articulosRouter.delete('/:id', deleteArticulo)


export {articulosRouter};
