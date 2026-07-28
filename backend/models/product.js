import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true, trim: true },
    Nombre: { type: String, required: true, trim: true },
    Descripcion: { type: String, trim: true },
    Precio: { type: Number, required: true },
    Image: { type: String, default: "assets/img/fondo.avif" },
    Categoria: { type: String, trim: true },
    stock: { type: Number, default: 0 }
}, { timestamps: true });

const product = mongoose.model("product", productSchema);

export default product;