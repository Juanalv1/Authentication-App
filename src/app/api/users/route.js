import { NextResponse } from "next/server"
import { isEmailValid } from "../middleware"
import dbPool from "../db"

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    const client = await dbPool.connect();
    
    // Realizar la inserción en la base de datos
    const result = await client.query('INSERT INTO public.users(email, password) VALUES ($1, $2);', [email, password]);

    // Verificar si la inserción fue exitosa
    if (result.rowCount === 1) {
      return NextResponse.json({ message: "exitoso" }, { status: 200 });
    } else {
      return NextResponse.error({ status: 500, body: "Error en la inserción" });
    }
  } catch (error) {
    console.error("Error al realizar la inserción:", error);
    return NextResponse.error({ status: 500, body: "Error en la solicitud" });
  } finally {
    // Asegurarse de liberar la conexión después de usarla
    client.release();
  }
}