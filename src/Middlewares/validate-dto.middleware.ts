// src/middleware/validate-dto.middleware.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Convertimos el cuerpo de la solicitud en una instancia de la clase DTO
    const dtoInstance = plainToInstance(dtoClass, req.body);

    // Ejecutamos la validación en la instancia del DTO
    validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {
      if (errors.length > 0) {
        // Procesamos los errores en un formato estructurado para el frontend
        const formattedErrors = errors.reduce((acc, error) => {
          const field = error.property; // Nombre del campo con error
          const constraints = error.constraints ? Object.values(error.constraints) : []; // Mensajes de error

          // Agrupamos los mensajes de error por campo
          acc[field] = constraints;
          return acc;
        }, {} as Record<string, string[]>);

        // Enviamos una respuesta JSON con el objeto de errores estructurado y un código 400
        return res.status(400).json({
          message: "Error de validación",
          errors: formattedErrors
        });
      } else {
        // Si no hay errores de validación, actualizamos `req.body` con los datos validados
        req.body = dtoInstance;
        // Llamamos a `next()` para pasar el control al siguiente middleware o controlador
        next();
      }
    });
  };
}

/*
 -- whitelist: true elimina cualquier propiedad no definida en el DTO, lo cual ayuda a limitar los datos solo a lo esperado.
 -- forbidNonWhitelisted: true genera un error si existen propiedades no permitidas en req.body
 -- errors.reduce() se utiliza para crear un objeto formattedErrors, donde cada clave es el nombre del campo y el valor es un arreglo de    mensajes de error.
 -- error.property obtiene el nombre del campo.
 -- Object.values(error.constraints) extrae los mensajes de error en un arreglo.
 -- El objeto formattedErrors permite que el frontend reciba los errores organizados por campo, facilitando la visualización y manejo de mensajes de error en la interfaz de usuario.
*/