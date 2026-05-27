import user from '../models/user.js';

//1.crear un nuevo usuario
export const registrarUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // validar que todos los campos esten presentes
        if (!nombre || !email || !password) {
            return res.status(400).json({msg: "todos los campos son obligatorios"});
        }
        // validar si el usuario ya exixte 

        const exixteUser = await user.findOne({ email });

        if (exixteUser) {
            return res.status(400).json({msg: "el usuario ya existe"});
        }

        // crear el nuevo usuario
        const nuevoUser = new user({ 
            nombre, 
            email, 
            password
        });

        // guardar el usuario en la base de datos
        await nuevoUser.save();
        res.status(201).json({ msg: "usuario registrado exitosamente"});


    } catch (error) {
        res.status(500).json({ msg: "error al registrar el usuario" });
    }

    };