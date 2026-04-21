// importamos todas las librerias de express
import express from 'express';

import dotenv from "dotenv";
import { conectarDB, supabase } from './db/db.js';
dotenv.config();

// creamos la app de express
const app = express();

conectarDB();

// para leer el formato json
app.use(express.json());

// creamos nuestra primera ruta 
app.get('/', (req, res) => {
    res.send ({
        mensaje: "bienvenido a mi API REST con Express"
    });

}
);

// ruta saludar
app.get('/saludo', (req, res) => {
    res.send({
        mensaje : "binvenido al curso de javascript",
        hora: new Date().toLocaleTimeString()
    });
}); 

// mi vida personal
app.get('/personal', (req, res) => {
    res.send({
        mensaje: "hola mi nombre es sofia tengo 19 años y soy aprendiz"
    });
});

app.get("/usuario", async (req,res) => {
    const { data, error } = await supabase
.from("usuario")
.select("*");

if (error) {
    console.error("error:", error);
    res.status(500).json({ error: "Error" });
    return res.status(500).json({error});
}

console.log("usuarios obtenidos:", data);

res.json({
    total: data.length,
    usuarios: data
});
});

// ruta de crear usuario a la base de datos
app.post ("/crear", async (req, res) => {
    
    //tomamos los datos como esta en la base de datos
    const { nombre, email, rol, activo } = req.body;

    // validamos que os datos no esten vacios 
    if (!nombre || !email || !rol || !activo) {
        console.log("faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    // insertamos los datos a la base de datos
    const { data, error } = await supabase
        .from("usuario")
        .insert([{ nombre, email, rol, activo }])
        .select();

        // validamos si hay un error al insertar los datos
        if (error) {
            console.error("error:", error);
            return res.status(500).json({ error});
        }

        // respuesta al usuario
        res.json({
            mensaje: "Usuario creado correctamente",
            usuario: data[0]
        });
});

// ruta de actualizar usuarios a la base de datos
app.put("/usuario/:id", async (req, res) => {

    console.log("🎮 BODY UPDATE:", req.body);

    const { id } = req.params;
    const { nombre, email, rol, activo } = req.body;

    // validar id

    if (!id) {
        return res.status(400).json({ error: "Falta el ID" });
    }

    // validar que llegue al menos un dato

    if (!nombre && !email && !rol && !activo) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    // construir objeto dinamico
    const datosActualizar = {};

    if (nombre) datosActualizar.nombre = nombre;
    if (email) datosActualizar.email = email;
    if (rol) datosActualizar.rol = rol;
    if (activo) datosActualizar.activo = activo;

    console.log("🎮 Datos  a actualizar:", datosActualizar);

    // actualizar en supabase 
    const { data, error } = await supabase
        .from("usuario")
        .update(datosActualizar)
        .eq("id", id)
        .select();

        console.log("🎮DB;", data);
        console.log("error:", error);

        if (error) {
            return res.status(500).json({ error });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({
            mensaje: "Usuario actualizado",
            usuario: data[0]
        });
});

// ruta de eliminar usuario a la base de datos
app.delete("/usuario/:id", async (req, res) => {

    const { id } = req.params;

    console.log("ID a eliminar:", id);

    // validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el ID" });
    }

    // eliminar en supabase
    const { data, error } = await supabase
        .from("usuario")
        .delete()
        .eq("id", id)
        .select();

    console.log("🎮DB:", data);
    console.log("error:", error);

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        mensaje: "Usuario eliminado",
        usuario: data[0]
    });
});

// definimos el puerto de nuestro servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`); 
});

