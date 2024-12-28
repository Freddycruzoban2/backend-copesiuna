import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { DecodedToken } from "../interfaces";
import { User } from "../entities";
import "dotenv/config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Accedemos al token enviado del cliente
  const token = getTokenFromHeaders(req);
  console.log("imprimiendo header", req.headers + "\n");
  console.log(token);

  // Si está vacío, retornamos un error
  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  try {
    // Verificamos el token, utilizando la variable de entorno JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

     // Validamos que el token sea un objeto tipo JwtPayload
     if (typeof decoded !== "object" || decoded === null) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Extraemos el id del token decodificado
    const id_user = decoded.sub as unknown as number;

    const user = User.findOne({
      where: {
        id: id_user,
      },
    });

    if (!user) {
      res.status(404).json({ message: "Unauthorized" });
      return;
    }

    //Agregar la información del usuario al objeto de solicitud
    req.user = {
      id: id_user,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const getTokenFromHeaders = (req: any): string | null => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};
