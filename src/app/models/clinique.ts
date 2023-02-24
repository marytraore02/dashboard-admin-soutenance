import { BooleanLiteral } from "typescript/lib/tsserverlibrary";

export class Clinique {
    id: number=0;
    nomEtPrenom: string="";
    contact: string="";
    date: string="";
    username: string="";
    email: string="";
    password: string="";
    descriptionClinique: string="";
    villeClinique: string="";
    adresseClinique: string="";
    longitudeClinique: string="";
    latitudeClinique: string="";
    agrementClinique: string="";
    imageClinique: string="";
    statusClinique!: boolean;
}   
