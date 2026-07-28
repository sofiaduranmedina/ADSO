import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    uppercase: true, 
    trim: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  codigoRecuperacion: String,
  codigoExpiracion: Date,

  rol: { 
    type: String, 
    enum: ["admin", "user"], 
    default: "user"
  }

}, { timestamps: true });


// Encriptar password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


export default mongoose.model("User", userSchema);