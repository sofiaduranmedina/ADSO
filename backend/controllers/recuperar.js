import user from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// configurar el transporte del correo

const transporte=nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

// FUNCION PARA GENERAR CODIGO DE RECUPERACION
const generarCode=()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// funcion de silicitar el codigo del correo 
export const solicitarCodigo = async (req, res) => {
    try {
        const { email } = req.body;
    
        // validar que el email exista
        if (!email) {
            return res.status(400).json({msg:"por favor ingrese su correo"});
        }

        // buscar el usuario por el correo

        const usuario=await user.findOne({email});
        if (!usuario){
            return res.status(400).json({msg:"usuario no encontrado"});
        }

        // generar el codigo de recuperacion
        const codigo=generarCode();

        usuario.codigoRecuperacion=codigo;
        usuario.codigoExpiracion=Date.now() + 90000;
        await usuario.save();
        
        // creamos o construimos el correo 
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:usuario.email,
            subject:"Codigo de recuperacion-sofia del sol",
            html:
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4F46E5; margin: 0;">🛍️ TechStore Pro</h2>
                </div>
                
                <h3 style="color: #333333;">Recuperación de Contraseña</h3>
                
                <p>Hola <strong>${usuario.Nombre || 'Usuario'}</strong>,</p>
                
                <p>Recibimos una solicitud para restablecer tu contraseña.</p>
                
                <p>Tu código de verificación es:</p>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            padding: 30px 20px; 
                            border-radius: 10px; 
                            text-align: center; 
                            margin: 30px 0;">
                    
                    <h1 style="color: #ffffff; 
                               font-size: 36px; 
                               letter-spacing: 8px; 
                               margin: 0;
                               font-family: 'Courier New', Courier, monospace;">
                        ${codigo}
                    </h1>
                </div>
                
                <p style="color: #666666; font-size: 14px;">
                    ⏱️ Este código expirará en <strong>15 minutos</strong>.
                </p>
                
                <p style="color: #71a767; font-size: 14px;">
                    🔒 Si no solicitaste este cambio, ignora este email y tu contraseña permanecerá segura.
                </p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #dddddd;">
                
                <p style="color: #999999; font-size: 12px; text-align: center;">
                    © 2026 TechStore Pro - Tu tienda de tecnología de confianza
                </p>
            </div>
            `
        };

        // enviar el correo

        await transporte.sendMail(mailOptions);
        res.status(200).json({msg:"codogo de recuperación enviado a tu correo"});
        
    } catch (error) {
        console.error("Error al enviar el correo de recuperación:", error);
        res.status(500).json({msg:"error al enviar el correo de recuperación"});
    }
};