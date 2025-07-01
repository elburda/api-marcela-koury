export const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
    const rolUsuario = req.user?.rol || req.headers["x-rol"];
    if (rolesPermitidos.includes(rolUsuario)) {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado" });
    }
    };
};
