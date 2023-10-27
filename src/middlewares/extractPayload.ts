import jwt from "jsonwebtoken";
import { Request } from "express";
import "dotenv/config";

export function extractJwtPayload(req: Request): any | null {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      return decoded;
    } catch (error) {
      // Si el token no es válido, se maneja el error y se devuelve null
      console.error(error);
      return null;
    }
  } else {
    // Si no hay token en el encabezado de autorización
    return null;
  }
}