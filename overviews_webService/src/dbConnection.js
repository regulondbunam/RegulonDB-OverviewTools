/**
# dbConnection
	
## Description
Realiza la conexión a la base de datos, tomando la ruta y dirección situados en las variables de entorno

## Usage 
dbConnection()

## Arguments/Parameters

DB_MONGO: El nombre de la base de datos a la cual se conectará

## Examples

Para agregar la base de datos es necesaria que esté escrita en las variables de entorno de ahí son tomadas, y la forma de
llamar esos datos es de la siguiente manera: 
Dentro del metodo connectionDB y dentro de nuestro Try agregamos una promesa
    await mongoose.connect()
Dentro de los parentesis colocamos process.env.DB_MONGO
con eso realizamos la llamada a los datos que existen en las variables de entorno y así se realiza la conexión 

## Return 

ConnectionDB()

Retorna la conexión si fue exitosa, de no ser así retorna un error especificando qué lo causó.

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: EDGAR ENRRIQUE HERNANDEZ MARCELO
**/

import mongoose from 'mongoose';

//require enviroment variables
require('dotenv').config({path: 'variables.env'});

//Connection to mongodb with the credentials on .env file
const connectionDB = async ()=> {
    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Se realizo la conexión...");
    }catch(error){
        console.log("hubo un error en la conexion ");
        console.log(error);
        process.exit(1);
    }
}

module.exports= connectionDB;


/**
	
# Functions description

## N/A

**/

