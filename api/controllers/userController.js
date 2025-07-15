import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

// Registrar usuario
export const registerUser = async (req, res) => {
    try {
    const { nombre, email, password, rol } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email ya registrado." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({ nombre, email, password: hashedPassword, rol });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (err) {
    console.error("❌ Error al registrar usuario:", err);
    res.status(500).json({ error: "Error al registrar usuario" });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(401).json({ message: "Contraseña incorrecta" });

        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: payload });
    } catch (err) {
        console.error("❌ Error en login:", err);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};


// Obtener todos los usuarios paginados
export const getUsersPaginated = async (req, res) => {
    try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit).select("-password");

    res.json({
        total,
        page,
        limit,
        users
        });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// Buscar usuario por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};

// Buscar usuario por nombre
export const searchUserByName = async (req, res) => {
    try {
        const nombre = req.query.nombre;
        const usuarios = await User.find({ nombre: new RegExp(nombre, "i") }).select("-password");
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: "Error al buscar usuarios" });
    }
};
