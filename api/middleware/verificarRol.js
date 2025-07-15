export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const { rol } = req.user;

        console.log('🔐 Middleware verificarRol: rol del usuario =>', rol);
        console.log('🔐 Roles permitidos =>', rolesPermitidos);

        if (!rolesPermitidos.includes(rol)) {
        console.warn('⛔ Acceso denegado: rol no autorizado');
        return res.status(403).json({ message: "Acceso denegado" });
        }

        next();
    };
};

