import { Role } from "../common/enum/role.enum";

export interface DecodedToken {
    sub: number;
    email: string;
    role: Role
  }