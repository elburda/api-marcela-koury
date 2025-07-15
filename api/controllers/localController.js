
import { Local } from '../models/localModels.js';
import Articulo from '../models/articulosModels.js';
import { User } from '../models/userModels.js';

// Crear un nuevo local
export const crearLocal = async (req, res) => {
    try {
        const { nombre, direccion, vendedores } = req.body;

        // Verificar si alguno de los vendedores ya tiene un local asignado
        const yaAsignados = await User.find({
            _id: { $in: vendedores },
            localAsignado: { $ne: null }
        });

        if (yaAsignados.length > 0) {
            return res.status(400).json({
                message: 'Uno o más vendedores ya están asignados a otro local.',
                yaAsignados: yaAsignados.map(v => v.email)
            });
        }

        const nuevoLocal = new Local({
            nombre,
            direccion,
            vendedores
        });

        await nuevoLocal.save();

        if (vendedores && vendedores.length > 0) {
            await User.updateMany(
                { _id: { $in: vendedores } },
                { $set: { localAsignado: nuevoLocal._id } }
            );
        }

        res.status(201).json(nuevoLocal);
    } catch (error) {
        console.error('❌ Error al crear local:', error.message);
        res.status(500).json({ message: 'Error al crear local', error: error.message });
    }
};

export const obtenerLocales = async (req, res) => {
    try {
        const locales = await Local.find().populate('vendedores', 'nombre apellido email');
        res.json(locales);
    } catch (error) {
        console.error('❌ Error al obtener locales:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

export const obtenerLocalPorId = async (req, res) => {
    try {
        const local = await Local.findById(req.params.id).populate('vendedores', 'nombre apellido email');
        if (!local) return res.status(404).json({ message: 'Local no encontrado' });
        res.json(local);
    } catch (error) {
        console.error('❌ Error al obtener local:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};


    export const actualizarLocal = async (req, res) => {
    try {
        const { nombre, direccion, vendedores } = req.body;

        if (!nombre || !direccion) {
        return res.status(400).json({ message: 'Nombre y dirección son obligatorios.' });
        }

        const local = await Local.findById(req.params.id);
        if (!local) {
        return res.status(404).json({ message: 'Local no encontrado' });
        }

        // Solo validamos vendedores si viene definido
        let idsYaAsignados = [];

        if (Array.isArray(vendedores)) {
        const yaAsignados = await User.find({
            _id: { $in: vendedores },
            localAsignado: { $ne: null, $exists: true }
        });

        const idsActuales = await User.find({ localAsignado: req.params.id }).distinct('_id');
        idsYaAsignados = yaAsignados.filter(v => !idsActuales.includes(v._id.toString()));

        if (idsYaAsignados.length > 0) {
            return res.status(400).json({
            message: 'Uno o más vendedores ya están asignados a otro local.',
            yaAsignados: idsYaAsignados.map(v => v.email)
            });
        }
        }

        // Actualizar local
        local.nombre = nombre;
        local.direccion = direccion;

        if (Array.isArray(vendedores)) {
        local.vendedores = vendedores;
        }

        await local.save();

        // Resetear vendedores previos solo si se mandó un nuevo array
        if (Array.isArray(vendedores)) {
        await User.updateMany(
            { localAsignado: local._id },
            { $unset: { localAsignado: '' } }
        );

        if (vendedores.length > 0) {
            await User.updateMany(
            { _id: { $in: vendedores } },
            { $set: { localAsignado: local._id } }
            );
        }
        }

        res.json({ message: 'Local actualizado correctamente.', local });

    } catch (error) {
        console.error('❌ Error al actualizar local:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
    };


export const obtenerVendedores = async (req, res) => {
    try {
        const vendedores = await User.find({ rol: 'vendedor' });
        res.json(vendedores);
    } catch (error) {
        console.error('❌ Error al obtener vendedores:', error.message);
        res.status(500).json({ message: 'Error interno al obtener vendedores', error: error.message });
    }
};

export const asignarVendedorALocal = async (req, res) => {
    try {
        const { localId, vendedorId } = req.body;
        const vendedor = await User.findById(vendedorId);
        if (!vendedor) return res.status(404).json({ message: 'Vendedor no encontrado' });

        vendedor.localAsignado = localId;
        await vendedor.save();

        res.json({ message: 'Vendedor asignado al local correctamente' });
    } catch (error) {
        console.error('❌ Error al asignar vendedor al local:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

export const eliminarLocal = async (req, res) => {
    try {
        const local = await Local.findByIdAndDelete(req.params.id);
        if (!local) return res.status(404).json({ message: 'Local no encontrado' });

        await User.updateMany(
            { localAsignado: local._id },
            { $unset: { localAsignado: '' } }
        );

        res.json({ message: 'Local eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar local:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};

export const obtenerMiLocal = async (req, res) => {
    try {
        const userId = req.user.id;
        const usuario = await User.findById(userId);

        if (!usuario || !usuario.localAsignado) {
            return res.status(404).json({ message: 'No tenés un local asignado.' });
        }

        const local = await Local.findById(usuario.localAsignado).populate('vendedores', 'nombre apellido email');

        if (!local) {
            await User.findByIdAndUpdate(userId, { $unset: { localAsignado: "" } });
            return res.status(404).json({ message: 'El local asignado fue eliminado. Esperá que te asignen uno nuevo.' });
        }

        res.json(local);
    } catch (error) {
        console.error('❌ Error al obtener el local asignado:', error.message);
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
};
