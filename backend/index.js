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
// definimos el puerto de nuestro servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`); 
});

