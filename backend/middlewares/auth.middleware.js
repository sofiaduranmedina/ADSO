// middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import Users from "../models/user.js";

// Verifica el token y consulta el usuario actualizado en BD
export const VerificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Inicie sesión"
            });
        }

        const token = authHeader.split(" ")[1];

        // Decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Consulta usuario actualizado en BD
        const usuario = await Users.findById(decoded.id).select("-password");

        if (!usuario) {
            return res.status(401).json({
                message: "Usuario no encontrado"
            });
        }

        // Guardamos usuario en la petición
        req.usuario = usuario;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expirado, inicia sesión nuevamente"
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Cuenta inválida"
            });
        }

        res.status(500).json({
            message: "Error en la autenticación",
            error: error.message
        });
    }
};


// Solo administradores
export const soloAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({
            message: "Acceso denegado: se requiere rol admin"
        });
    }

    next();
};


// Solo usuarios
export const soloUser = (req, res, next) => {
    if (req.usuario?.rol !== "user") {
        return res.status(403).json({
            message: "Acceso denegado: se requiere rol user"
        });
    }

    next();
};