import { UserRole } from "./user.entity";

export class UserDto {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: UserRole;
  }
  