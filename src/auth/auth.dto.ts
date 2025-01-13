//import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: 'nonverifie';
    dateInscription: Date;
    dateModification: Date;
    validateUser: boolean       
}

