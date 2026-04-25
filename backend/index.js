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

//rutas de pedidos 

app.get("/pedidos/:usuario_id", async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      id,
      descripcion,
      cantidad,
      total,
      usuario (
        nombre,
        email
      )
    `);

    if (error) {
        console.error("error:", error);
        res.status(500).json({"error": error});
        return res.status(500).json({error});
    }

    console.log("pedidos obtenidos:", data);

    res.json({
        total: data.length,
        pedidos: data
    });
});

// ruta de crear pedidos a la base de datos
app.post("/pedidos", async (req,res)=> {
    
    //tomamos los datos como esta en la base de datos
    const {descripcion,cantidad,total,usuario_id} = req.body;

    // validamos que os datos no esten vacios
    if (!descripcion || !cantidad || !total || !usuario_id ) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // insertamos los datos a la base de datos
    const { data, error } = await supabase
        .from("pedidos")
        .insert([{ descripcion, cantidad, total, usuario_id, }])
        .select();

        // validamos si hay un error al insertar los datos
        if (error) {
            console.error("error:", error);
            return res.status(500).json({ error });
        }

        // respuesta al usuario
        res.json({
            mensaje: "Pedido creado correctamente",
            pedido: data[0]
        });
});


// ruta de actualizar usuarios a la base de datos
app.put("/pedidos/:id", async (req, res) => {

    console.log("🎮 BODY UPDATE:", req.body);

    const { id } = req.params;
    const { descripcion,cantidad,total,usuario_id} = req.body;

    // validar id

    if (!id) {
        return res.status(400).json({ error: "Falta el ID" });
    }

    // validar que llegue al menos un dato

    if (!descripcion && !cantidad &&  !total && !usuario_id) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    // construir objeto dinamico
    const datosActualizar = {};

    if (descripcion) datosActualizar.descripcion = descripcion;
    if (cantidad) datosActualizar.cantidad = cantidad;
    if (total) datosActualizar.total = total;
    if (usuario_id) datosActualizar.usuario_id = usuario_id;

    console.log("🎮 Datos  a actualizar:", datosActualizar);

    // actualizar en supabase 
    const { data, error } = await supabase
        .from("pedidos")
        .update(datosActualizar)
        .eq("id", id)
        .select();

        console.log("🎮DB;", data);
        console.log("error:", error);

        if (error) {
            return res.status(500).json({ error });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "pedidos no encontrados" });
        }

        res.json({
            mensaje: "pedidos actualizados",
            pedidos: data[0]
        });
});

// ruta de eliminar usuario a la base de datos
app.delete("/pedidos/:id", async (req, res) => {

    const { id } = req.params;

    console.log("ID a eliminar:", id);

    // validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el ID" });
    }

    // eliminar en supabase
    const { data, error } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", id)
        .select();

    console.log("🎮DB:", data);
    console.log("error:", error);

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "pedisos no encontrados" });
    }

    res.json({
        mensaje: "pedido eliminado",
        usuario: data[0]
    });
});


// ruta de factura 
app.get("/factura/:pedidos_id/:usuario_id", async (req,res)=>{
    const {data,error} = await supabase
    .from ('factura')
    .select(`
        id,
        numero_factura,
        subtotal,
        impuesto,
        total,
        estado,
        metodo_pago,
        
        pedidos:pedidos_id(
        id,
        descripcion,
        cantidad,
        total
    ),
        usuario: usuario_id(
        nombre,
        email
     )
    `)

      if (error) {
        console.error("error:", error);
        res.status(500).json({"error": error});
        return res.status(500).json({error});
    }

    console.log("facturas obtenidas:", data);

    res.json({
        total: data.length,
        factura: data
    });
});

// ruta de crear factura en la base de datos

app.post("/factura", async (req,res)=> {
    
    //tomamos los datos como esta en la base de datos
    const {numero_factura,subtotal,impuesto,total,estado,metodo_pago,pedidos_id,usuario_id} = req.body;

    // validamos que os datos no esten vacios
    if (!numero_factura || !subtotal || !impuesto || !total || !estado || !metodo_pago || !pedidos_id || !usuario_id) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // insertamos los datos a la base de datos
    const { data, error } = await supabase
        .from("factura")
        .insert([{numero_factura,subtotal,impuesto,total,estado,metodo_pago,pedidos_id,usuario_id}])
        .select();

        // validamos si hay un error al insertar los datos
        if (error) {
            console.error("error:", error);
            return res.status(500).json({ error });
        }

        // respuesta al usuario
        res.json({
            mensaje: "factura creada correctamente",
            factura: data[0]
        });
});




// definimos el puerto de nuestro servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`); 
});

