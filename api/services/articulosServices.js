import Articulo from "../models/articulosModels.js";
import { v4 as uuidv4 } from "uuid";

export async function getArticulos({order}) {
    let articulos = await getAllArticulos();

    if(order === 'asc'){
        articulos.sort((a, b) => a.title.localeCompare(b.title))
    }else if(order === 'desc'){
        articulos.sort((a, b) => b.title.localeCompare(a.title))
    }

    return articulos;
}

export async function getArticulosById(id) {
    let articulos = await getAllArticulos();

    return articulos.find(a => a.id === id);
}


export async function createArticulo(data) {
    let articulos = await getAllArticulos();
    const newArticulo = {id:uuidv4(),...data};
    articulos.push(newArticulo);
    await saveAllArticulos(articulos);

    return newArticulo;
}

export async function updateArticulo(id, updates) {
    let articulos = await getAllArticulos();
    const index = articulos.findIndex(m => m.id === id);
    if(index === -1) return null;
    articulos[index] = {...articulos[index], ...updates}
    await saveAllArticulos(articulos);
    return articulos[index];
    
}

export async function deleteArticulo(id) {
    let articulos = await getAllArticulos();
    const index = articulos.findIndex(m => m.id === id);
    if(index === -1) return null;

    articulos.splice(index, 1)
    await saveAllArticulos(articulos);
    return true;
    
}