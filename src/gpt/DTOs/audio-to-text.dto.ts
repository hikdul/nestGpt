
import {  IsOptional, IsString } from "class-validator";
// ! este no es la mejor opcion
export class audioToTextDTO {
    
    readonly audio: Express.Multer.File
    
    @IsString()
    readonly prompt?: string
}

//` esta si es la verdadera opcion viable...
export class audioToTextDTO2 {
    
    @IsString()
    @IsOptional()
    readonly prompt?: string
}

// * esto de opcion viable es por decicion del Fernando Herera.
// * lo opcion no viable fue mi idea buscando la opcion.

// ? de igual modo no entiendo como los datos se distribullen en sus contenedores para poder trabajar en el BackEnd
