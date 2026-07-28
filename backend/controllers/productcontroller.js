import product from "../models/product.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await product.find();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

// Obtener un producto por ID
export const getProductoPorId = async (req, res) => {
  try {
    const producto = await product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {

    console.log(req.body);

    const {
      productId,
      Nombre,
      Descripcion,
      Precio,
      Image,
      Categoria,
      stock,
    } = req.body;
    
    if (!productId || !Nombre || !Precio) {
      return res.status(400).json({
        message: "productId, Nombre y Precio son obligatorios",
      });
    }

    const nuevoProducto = new product({
      productId,
      Nombre,
      Descripcion,
      Precio,
      Image,
      Categoria,
      stock,
    });

    await nuevoProducto.save();

    res.status(201).json({
      message: "Producto creado exitosamente",
      producto: nuevoProducto,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
      producto: productoActualizado,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto eliminado exitosamente",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};