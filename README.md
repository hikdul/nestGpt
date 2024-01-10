<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

primer proyecto construido en [Nest](https://github.com/nestjs/nest).

en este proyecto solo se prueba el uso de nest como un backend que se comunica con las api's de OpenIA para simular diferentes comportamientos de ChatGpt.

el frontEnd de este proyecto esta en esta [direccion](https://github.com/hikdul/reactgpt)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## archivo .env

crear el archivo basado en el archivo .end.template

* OPENAI_API_KEY key personal de openAPI

## ramas y actividades

### proscons

aca la idea es un analista de pros y contra sobre X tema. 

en esta seccion se revisa los siguientes datos

* OpenAI Stream
* For await
* Decoradores nuevos como
* @Res
* Chunks
* DTOs

### traducciones
 
en esta rama se trabaja en un software que tenga la capacidad de traducir un texto de un idioma a otro

### textoToAudio

la idea aca es que desde un audio obtenido se genere el texto.

* Generar audio en diferentes formatos
* Almacenar audio en el FileSystem del backend 
  * Esto solamente para esta practica. si esto se hace en la vida real, se debe de usar un servicio para almacenar estos archivos
* Creación de endpoint para obtener audios previamente generados
* Mensajes de error personalizados en Nest.

### audioTexto

en esta rama se ven los cambio generales para trabajar con la transformacion de audio a texto. esto con la idea de generar subtitulos y otro tipo de elementos utiles para diversos tipos de aplicaciones. Los puntos resaltante son los siguientes

* Transcripciones
* Subtítulos en varios formatos
* Crear el archivo en filesystem
