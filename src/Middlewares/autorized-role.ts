import { Request, Response, NextFunction } from "express";

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar que `req.user` exista
    const userRole = req.user?.role;
    console.log('imprimiendo userrole', userRole)

    if (!userRole) {
      res.status(403).json({ message: "Acceso denegado: usuario no autenticado." });
      return;
    }

    // Verificar si el rol del usuario está en la lista de roles permitidos
    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Acceso denegado: rol no autorizado." });
      return;
    }

    next(); // Continuar con el siguiente middleware o controlador
  };
}
