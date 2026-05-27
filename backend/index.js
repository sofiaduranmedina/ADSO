// importamos todas las librerias de express
import 'dotenv/config';
import express from 'express';
import { conectarDB } from './db/db.js';
import userRoutes from './routes/user.js';
import loginRoutes from './routes/login.js';
import recuperarRoutes from './routes/recuperar.js';


// creamos la app de express
const app = express();
conectarDB();

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
// rutas de usuarios
app.use('/users', userRoutes);
// rutas de login
app.use('/', loginRoutes);
// rutas de recuperar contraseña
app.use('/', recuperarRoutes);


// mi vida personal
app.get('/personal', (req, res) => {
    res.send({
        mensaje: "hola mi nombre es sofia tengo 19 años y soy aprendiz"
    });
});





// definimos el puerto de nuestro servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`); 
});

