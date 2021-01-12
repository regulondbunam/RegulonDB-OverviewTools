/**
# Overviews Model

## Description
Genera el modelo de las collecciones en mongoDB, todo el modelo que aquí se genere deberá ser igual a la declaración
del Schema.graphql, deberá seguir la misma estructura de la colección en mongo así como de los tipos de datos ya que 
este modelo será con el que podremos enviar la información a el servicio web.

## Usage 

N/A

## Arguments/Parameters

N/A

## Examples
N/A
## Return 
N/A

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: EDGAR ENRRIQUE HERNANDEZ MARCELO
**/
import mongoose from 'mongoose';
//Importamos el modulo de mongoose para poder crear un schema 

//Generamos el schema con los mismos campos, tipos de datos y nombre de las variables definidas en nuestro .graphql
const overviewInformationObject = new mongoose.Schema({
    _id: String,
    queryName: String,
    objectType: String,
    graph: {
      title: String,
      description: String,
      labelX: String,
      labelY: String,
      footGraph: String,
      graphType: String,
    },
    data: [
      {
        xAxis: Number,
        yAxis: Number,
        objectsRelated: [
          {
            _id: String,
            name: String,
          },
        ],
      },
    ],
  });

  //Creamos un modelo de nuestro schema, con el modulo mongoo.model y agregando el nombre de la base de datos a la cual se conectará
  //y enviandole nuestro Schema generado anteriormente, ya que deberá existir esa misma coleccion en mongo y podrémos obtener todos esos datos
  const Overviews = mongoose.model('genedatamarts',overviewInformationObject); //Cambiar geneDatamarts por la variable
  export {Overviews};

/**
	
# Functions description

## N/A
**/

