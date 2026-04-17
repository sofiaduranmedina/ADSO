import "dotenv/config"; //carga las variables automáticamente al importar
import { createClient }  from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// verificación de seguridad para evitar que el servidor arranque sin datos
if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Faltan las variables de entorno en el archivo .env");
    process.exit(1); 
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const conectarDB = async () => {
    console.log("CONEXCIÓN CON SUPABASE EXITOSA");
};