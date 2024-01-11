
import {  IsOptional, IsString } from "class-validator";
// ! este no es la mejor opcion
export class audioToTextDTO {
    
    readonly audio: Express.Multer.File
    
    @IsString()
    readonly prompt?: string
}
//` esta si es la verdadera opcion viabel
export class audioToTextDTO2 {
    
    @IsString()
    @IsOptional()
    readonly prompt?: string
}