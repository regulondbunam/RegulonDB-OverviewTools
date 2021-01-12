/**
# overviews Web Service
	
## Description
Este servicio web realiza la conexion entre MongoDB mendiante apollo server y el frontend de React mediante Apollo client
obteniendo asi los datos provenientes desde el datamart de overviews y mostrandolos de manera grafica para el usuario,
también cuenta con dos consultas a dicha base de datos, la primera se encarga de mostrar todos los objetos existentes
y la segunda se encarga de un objeto en especifico el cual se representa en el frontend mediante una gráfica y su respectiva
tabla de datos.

[Description details]

## Usage 
N/A

## Arguments/Parameters

N/A
## Examples
N/A

## Return 

__[Type]:__ [Name]
[Description (if necessary)]

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: Edgar Enrrique Hernandez Marcelo
**/


const express = require('express');
const {typeDefs} = require('./schema') ;
const {resolvers} = require('./resolvers') ;
const {ApolloServer} = require('apollo-server');

const connectionDB = require('./dbConnection');

connectionDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});

server.listen().then(({url})=>{
  console.log(`server ready on URL : ${url}`)
})

/**
	
# Functions description

## connectionDB

__Description:__ 

Hace uso de la funcion connectionDB la cual se encarga de realizar la conexion entre el servidor y el cliente de apollo


N/A
__Return:__ 
N/A
**/

