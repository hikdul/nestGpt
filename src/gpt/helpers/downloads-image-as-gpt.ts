import { InternalServerErrorException } from "@nestjs/common"
import * as path from "path"
import * as fs from "fs"
import * as sharp from "sharp"

export const  downloadImageAsPNG = async (url: string) =>{
    
    const response = await fetch(url)
    
    if(!response.ok)
        throw new InternalServerErrorException('no es posible guardar la imagen')
    
    const folderPath = path.resolve('./generate/images/')
    fs.mkdirSync(folderPath, {recursive:true})
    
    const imageName = `${new Date().getTime()}.png`
    const buffer = Buffer.from(await response.arrayBuffer())
    
    // ? esto lo comentamas ya que aqqui no retornamos una imagen en png como es
   // fs.writeFileSync(`${folderPath}/${imageName}`, buffer)
   
   const completePAth = path.join(folderPath, imageName)
   
   await sharp(buffer)
    // ~ lo trasformamos a png       
    .png()
    // ~ activamos el canal alpha   
    .ensureAlpha()
    // ~ lo guardamos en un archivo 
    .toFile(completePAth)

    return completePAth
    
}