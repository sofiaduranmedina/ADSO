import user from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configurar transporte del correo
const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Función para generar código de recuperación
const generarCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==========================
// SOLICITAR CÓDIGO
// ==========================
export const solicitarCodigo = async (req, res) => {
    try {
        const { email } = req.body;

        // Validar email
        if (!email) {
            return res.status(400).json({
                msg: "Por favor ingrese su correo",
            });
        }

        // Buscar usuario
        const usuario = await user.findOne({ email });

        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
            });
        }

        // Generar código
        const codigo = generarCode();

        usuario.codigoRecuperacion = codigo;

        // 15 minutos
        usuario.codigoExpiracion = Date.now() + 15 * 60 * 1000;

        await usuario.save();

        // Construir correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.email,
            subject: "Código de recuperación - TechStore Pro",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                
                <h2 style="color:#4F46E5;">🛍️ TechStore Pro</h2>

                <h3>Recuperación de contraseña</h3>

                <p>Hola <strong>${usuario.Nombre || "Usuario"}</strong>,</p>

                <p>Recibimos una solicitud para restablecer tu contraseña.</p>

                <p>Tu código de verificación es:</p>

                <div style="
                    background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    margin: 20px 0;
                ">
                    <h1 style="
                        color: white;
                        font-size: 36px;
                        letter-spacing: 8px;
                        margin: 0;
                    ">
                        ${codigo}
                    </h1>
                </div>

                <p>⏱️ Este código expirará en <strong>15 minutos</strong>.</p>

                <p style="color: #22c55e;">
                    🔒 Si no solicitaste este cambio puedes ignorar este correo.
                </p>

                <hr>

                <p style="font-size:12px; color:#999; text-align:center;">
                    © 2026 TechStore Pro
                </p>

            </div>
            `,
        };

        // Enviar correo
        await transporte.sendMail(mailOptions);

        return res.status(200).json({
            msg: "Código de recuperación enviado al correo",
        });

    } catch (error) {
        console.error("Error al enviar el correo:", error);

        return res.status(500).json({
            msg: "Error al enviar el correo de recuperación",
        });
    }
};

// ==========================
// CAMBIAR CONTRASEÑA
// ==========================
export const cambiarPassword = async (req, res) => {
    try {

        const { email, codigo, nuevaPassword } = req.body;

        // Validar campos
        if (!email || !codigo || !nuevaPassword) {
            return res.status(400).json({
                msg: "Todos los campos son requeridos",
            });
        }

        // Validar contraseña
        if (nuevaPassword.length < 6) {
            return res.status(400).json({
                msg: "La contraseña debe tener al menos 6 caracteres",
            });
        }

        // Buscar usuario
        const usuario = await user.findOne({
            email,
            codigoRecuperacion: codigo,
            codigoExpiracion: { $gt: Date.now() },
        });

        if (!usuario) {
            return res.status(400).json({
                msg: "Código inválido o expirado",
            });
        }

        // Cambiar contraseña
        usuario.Password = nuevaPassword;

        // Limpiar código
        usuario.codigoRecuperacion = null;
        usuario.codigoExpiracion = null;

        // Guardar cambios
        await usuario.save();

        // Correo de confirmación
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.email,
            subject: "Contraseña cambiada - TechStore Pro",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:20px; color:#333;">

                <div style="text-align:center; margin-bottom:30px;">
                    <h2 style="color:#4F46E5;">✅ Contraseña actualizada</h2>
                </div>

                <p>Hola <strong>${usuario.Nombre}</strong>,</p>

                <p>
                    Tu contraseña ha sido cambiada exitosamente.
                </p>

                <div style="
                    background:#f0fdf4;
                    border-left:4px solid #22c55e;
                    padding:15px;
                    margin:20px 0;
                ">
                    ✅ Ya puedes iniciar sesión con tu nueva contraseña.
                </div>

                <p style="color:#dc2626;">
                    ⚠️ Si no realizaste este cambio, contacta soporte inmediatamente.
                </p>

                <hr>

                <p style="font-size:12px; color:#999; text-align:center;">
                    © 2026 TechStore Pro
                </p>

            </div>
            `,
        };

        // Enviar correo
        await transporte.sendMail(mailOptions);

        return res.status(200).json({
            msg: "Contraseña cambiada exitosamente",
        });

    } catch (error) {

        console.error("Error al cambiar la contraseña:", error);

        return res.status(500).json({
            msg: "Error al cambiar la contraseña",
            error: error.message,
        });
    }
};