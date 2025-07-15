
import express from 'express';
import {
    obtenerLocales,
    obtenerLocalPorId,
    actualizarLocal,
    obtenerVendedores,
    asignarVendedorALocal,
    crearLocal,
    eliminarLocal,
    obtenerMiLocal
} from '../controllers/localController.js';

import { authenticateJWT } from '../middleware/authenticateJWt.js';
import { verificarRol } from '../middleware/verificarRol.js';

const router = express.Router();

//  Crear un nuevo local (admin)
router.post('/', authenticateJWT, verificarRol(['admin']), crearLocal);

//  Obtener todos los locales (admin)
router.get('/', authenticateJWT, verificarRol(['admin']), obtenerLocales);

//  Obtener usuarios con rol "vendedor" (admin)
router.get('/vendedores', authenticateJWT, verificarRol(['admin']), obtenerVendedores);

//  Obtener el local del vendedor logueado (¡antes que :id!)
router.get('/mi-local', authenticateJWT, verificarRol(['vendedor']), obtenerMiLocal);

//  Obtener un local por ID (admin)
router.get('/:id', authenticateJWT, verificarRol(['admin']), obtenerLocalPorId);

//  Actualizar un local (admin)
router.put('/:id', authenticateJWT, verificarRol(['admin']), actualizarLocal);

//  Eliminar un local (admin)
router.delete('/:id', authenticateJWT, verificarRol(['admin']), eliminarLocal);

//  FUTURO: Asignar vendedor a un local (admin)
router.post('/asignar-vendedor', authenticateJWT, verificarRol(['admin']), asignarVendedorALocal);

export default router;






