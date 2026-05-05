import { supabase } from "../db/db.js";

export const userModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("usuario")
            .select("*");

        return { data, error };
    },

    crearUsuario: async (usuario) => {
        const { data, error } = await supabase
            .from("usuario")
            .insert([usuario])
            .select();

        return { data, error };
    },

    actualizarUsuario: async (id,datos) =>{
        const {data,error} = await supabase
        .from("usuario")
        .update(datos)
        .eq("id", id)
        .select();

        return { data, error };
    },
};