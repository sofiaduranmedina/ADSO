import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const loginRoutes = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "por favor ingrese email y contraseña" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "usuario no encontrado" });
        }

        const esValida = await bcrypt.compare(password, user.password);

        if (!esValida) {
            return res.status(400).json({ msg: "contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            msg: "inicio de sesión exitoso",
            token,
            usuario: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            msg: "error del login",
            error: error.message
        });
    }
};