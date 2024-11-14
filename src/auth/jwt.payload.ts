// src/auth/jwt-payload.interface.ts

export interface JwtPayload {
    email: string;
    sub: number; // par exemple, un ID utilisateur
    role: string;
  }
  