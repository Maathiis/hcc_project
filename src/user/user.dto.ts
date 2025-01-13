//import { isString } from "util";
import { UserRole } from "./user.entity";

export class UserDto {
    //@isString()
    //@IsNotEmpty()
    nom: string;

    //@isString()
    //@IsNotEmpty()
    prenom: string;

    //@isString()
    //@IsNotEmpty()
    email: string;

    //@isString()
    //@IsNotEmpty()
    password: string;

    //@isString()
    //@IsNotEmpty()
    role: UserRole;
  }
  