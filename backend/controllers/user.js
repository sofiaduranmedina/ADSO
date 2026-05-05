import { userModel } from '../models/user.js';

export const usuario = async (req,res)=>{

    // aqui se recibe el modelo envio con el return

    const {data,error} = await userModel.obtenerTodos();
    console.log ("DATA:", data);
    console.log ("ERROR", error);

    if (error){
        return res.status (400).json ({error});
    }
    
    return res.status (200).json (data)
};

export const crearUsuario = async (req,res) =>{
    const{nombre,email,rol,activo}= req.body;

    // validación rápida 

    if (!nombre || !email || !rol || !activo) {
        return res.status(500).json ({mensaje: "falta datos"});
    }

    const {data, error} = await userModel.crearUsuario({nombre,email,rol,activo});
    if (error){
        return res.status(400).json({
            mensaje : "no se pudo crear usuario",
            error: error.message
        });

    }
    return res.status(201).json({
        mensaje: "usuario creado exitosamente",
        usuario: data[0]
    });
};