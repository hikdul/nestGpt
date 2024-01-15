import { IsString } from "class-validator";

export class imageVariationDTO {

    @IsString()
    readonly baseImage: string
    
}