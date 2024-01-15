import * as path from "path"
import * as fs from "fs"
import sharp from "sharp"

export const downloadBase64ImageAsPng = async (base64Image: string, needFullPack: boolean = false ) => {

  // ~ Remover encabezado
  base64Image = base64Image.split('base64,').pop()
  const imageBuffer = Buffer.from(base64Image, 'base64')

  const folderPath = path.resolve('./', './generate/images/')
  fs.mkdirSync(folderPath, { recursive: true })

  const imageNamePng = `${ new Date().getTime() }--64.png`
  const imgPath = path.join(folderPath, imageNamePng)

  // ~ Transformar a RGBA, png // Así lo espera OpenAI
  await sharp(imageBuffer)
    .png()
    .ensureAlpha()
    .toFile(imgPath)

  return needFullPack ?  imgPath : imageNamePng

}