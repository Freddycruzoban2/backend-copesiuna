// src/types/express/index.d.ts
import * as express from 'express';
import { Role } from '../../enum/role.enum';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}
