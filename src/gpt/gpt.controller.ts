import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { audioToTextDTO2, orthographyDTO, prosConsDiscuserDTO, textToAudioDTO, TranslatorDTO } from './DTOs';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { Transcription } from 'openai/resources/audio/transcriptions';

@Controller('gpt')
export class GptController {

  constructor(private readonly gptService: GptService) {}
  
  // * para enviar ese detalle!!
  @Post('orthography-check')
  orthographyCheck(@Body() dto: orthographyDTO){
    return this.gptService.orthographyCheck(dto) 
    //return dto
  }

  // * pros y contras discuser
  @Post('pros-cons-discuser')
  prosConsDiscuser(@Body() dto: prosConsDiscuserDTO)
  {
    return this.gptService.prosConsDicusser(dto);
  }
  
  // * para que genere todo mediante un stream
  @Post('pros-cons-discuser-stream')
  async prosConsDiscuserStream(@Body() dto: prosConsDiscuserDTO, @Res() res: Response)
  {
    const stream = await this.gptService.prosConsDicusserStream(dto);
    res.setHeader('Content-Type', 'application/json')
    res.status(HttpStatus.OK)
    
    // ahora la magia
    // ! 'for await(...)' es para indicar que el el stream
    for await(const chunk of stream)
    {
      const piece = chunk.choices[0].delta.content || ''
      // -- se observa desde la consola ya que postman no tiene buena respuesta para estos casos
      console.log(piece)
      res.write(piece)
    }
    // ! aca cierro la llamada del stream.
    res.end()
    
    }
  
 // *  traducto entre idiomas
  @Post('translate')
  translator(@Body() dto: TranslatorDTO)
  {
    return this.gptService.translator(dto);
  }
  
   // * transforma el texto a audio
  @Post('text-to-audio')
  async textToAudio(@Body() dto: textToAudioDTO, @Res() res: Response)
  {
    const fp = await this.gptService.textToAudio(dto);
    res.setHeader('Content-Type','audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(fp)
  }
// * retorna un audio por su codigo

  @Get('text-to-audio/:code')
  async textToAudioGet(@Param('code') code:string ,@Res() res: Response)
  {
    const fp = await this.gptService.textToAudioGet(code);
    res.setHeader('Content-Type','audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(fp)
  }
  

  // * transforma un audio a texto
  // ? que son los interseptores.. investigar mas sobre este detalle en nest
  // ? crear decoradores personalisado.. esta para reducir el codigo en el interceptor y tambien que utilidad tienen. 
  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('audio', {
    storage: diskStorage({
      destination: './generate/uploads/',
      filename(req, file, callback) {
        const ext = file.originalname.split('.').pop()
        const fileName = `${new Date().getTime()}.${ext}`
        return callback(null,fileName)
      },
    })
  }))
  async audioToText(
    @UploadedFile(new ParseFilePipe({
    validators:[
      new MaxFileSizeValidator({maxSize:1000*1024*3, message:'peso maximo 3Mb'}),
      new FileTypeValidator({ fileType: 'audio/*'})
    ]
  })) audio:Express.Multer.File,
    @Body() {prompt}: audioToTextDTO2
  ): Promise<Transcription>
  {
    // -- este elemento si tiene bastante tela en la cobecera. Se debe de mejorar.
    return this.gptService.AudioToText({ audio, prompt })
  }
  
}


