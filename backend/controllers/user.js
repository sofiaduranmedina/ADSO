import { userModel } from "../models/user.js";

// traer usuarios
export const usuario = async (req, res) => {

    const { data, error } = await userModel.obtenerTodos();

    if (error) {
        return res.status(500).json({ error });
    }

    res.json(data);
};

// crear usuario
export const crearUsuario = async (req, res) => {

    const { nombre, email, rol, activo } = req.body;

    const nuevoUsuario = {
        nombre,
        email,
        rol,
        activo
    };

    const { data, error } = await userModel.crearUsuario(nuevoUsuario);

    if (error) {
        return res.status(500).json({ error });
    }

    res.json({
        mensaje: "Usuario creado",
        usuario: data[0]
    });
};

// actualizar usuario
export const actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    const { nombre, email, rol, activo } = req.body;

    const datos = {};

    if (nombre) datos.nombre = nombre;
    if (email) datos.email = email;
    if (rol) datos.rol = rol;
    if (activo !== undefined) datos.activo = activo;

    const { data, error } = await userModel.actualizarUsuario(id, datos);

    if (error) {
        return res.status(500).json({ error });
    }

    res.json({
        mensaje: "Usuario actualizado",
        usuario: data[0]
    });
};