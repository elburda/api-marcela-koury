
import bcrypt from "bcrypt";
import { User } from "../models/userModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const secretkey = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { name, lastname, email, username, password, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            nombre: name,
            apellido: lastname,
            email,
            username,
            password: hashedPassword,
            rol: rol || "vendedor"
        });

        await nuevoUsuario.save();

        const { password: _, ...userSinPassword } = nuevoUsuario.toObject();
        res.status(201).json(userSinPassword);
    } catch (error) {
        console.error("Error en registerUser:", error);
        res.status(500).json({ mensaje: "Error al crear usuario" });
    }
};

// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             console.warn("Login fallido: email no encontrado:", email);
//             return res.status(404).json({ message: "Email no encontrado" });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//             console.warn("Login fallido: contraseña incorrecta para:", email);
//             return res.status(401).json({ message: "Contraseña incorrecta" });
//         }

//         const token = jwt.sign(
//             { id: user._id, email: user.email, rol: user.rol },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error("Error real en loginUser:", error);
//         res.status(500).json({ message: "Error al iniciar sesión" });
//     }
// };
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            console.warn("Login fallido: email no encontrado:", email);
            return res.status(404).json({ message: "Email no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            console.warn("Login fallido: contraseña incorrecta para:", email);
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error("Error real en loginUser:", error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};


export const getUsersPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await User.countDocuments();
        const users = await User.find({}, { password: 0 })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: users
        });
    } catch (error) {
        console.error("Error en getUsersPaginated:", error);
        res.status(500).json({ message: "Error al obtener usuarios paginados" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error en getUserById:", error);
        res.status(500).json({ message: "Error al obtener usuario por ID" });
    }
};

export const searchUserByName = async (req, res) => {
    try {
        const nombre = req.query.nombre;
        if (!nombre) return res.status(400).json({ message: "Falta el parámetro 'nombre'" });

        const users = await User.find(
            { nombre: { $regex: nombre, $options: "i" } },
            { password: 0 }
        );

        res.status(200).json(users);
    } catch (error) {
        console.error("Error en searchUserByName:", error);
        res.status(500).json({ message: "Error al buscar usuario por nombre" });
    }
};
