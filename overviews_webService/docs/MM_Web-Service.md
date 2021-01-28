``` 
title: Manual de Mantenimiento - Servicio Web Overviews Tools
date: 2020-12-20
author: Edgar Enrrique Hernández Marcelo
```

# Manual de Mantenimiento: Servicio Web - Overviews Tools

[toc]



## Introducción 

Este manual otorga la información necesaria para la comprensión del servicio web, se detallara el funcionamiento de cada subprograma que conforma este servicio, se da a conocer también el estado en el que se encuentra actualmente el servicio web y lo que se debe modificar para generar más consultas, datos, etc.



## Estructura interna del programa

En la *figura 1.0* se muestra la estructura o esqueleto de carpetas con las que cuenta el servicio web, las cuales se explicaran posteriormente. 

![EstructuraWS](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\EstructuraWS.JPG)

La carpeta **build** se crea posterior a correr el comando que inicia el servicio web el cual es **npm run start**

La carpeta **Node modules** contiene la información de las dependencias que se utilizaron en el servicio web, posteriormente tenemos la carpeta principal que compone el servicio web la cual es **src** la cual contiene una carpeta interna que son las clases principales del servicio web de *overviews tools* las cuales se detallarán más adelante.



## Carpeta de OverviewsService

#### overviews_schema.graphql

El siguiente código es la definición de datos y tipos de datos en Graphql, si se quieren agregar  nuevos datos o nuevas consultas se tienen que generar primero en este archivo, aquí es donde se definen los campos, objetos y querys.

```json
type Overview{
  getAllObjectInfo:  [overviewInfoType]
  getOverview(_id: String): overviewInfoType
}

type overviewInfoType {
  _id: String
  queryName: String
  objectType: String
  graph: graphType
  data: [dataType]
}

type graphType {
  title: String
  description: String
  labelX: String
  labelY: String
  footGraph: String
  graphType: String
}

type dataType {
  xAxis: Int
  yAxis: Int
  objectsRelated: [objectsRelatedType]
}

type objectsRelatedType {
  _id: String
  name: String
}
type Query {
  getAllObjectInfo:  [overviewInfoType]
  getOverview(_id: String): overviewInfoType
}

```

Se creó esta estructura que es la misma que la colección en la base de datos en MongoDB, los tipos de datos así como el nombre de las variables deben ser iguales de lo contrario habrá errores al momento de realizar consultas.

Una vez declarados los objetos que compondran el documento, declaramos lo que retornarán las consultas y les asignamos un nombre para cuando sean llamados

En el siguiente codigo se muestra un ejemplo de cómo realizar un query, primero se declara el nombre para este caso se declararon dos querys, el primero **getAllObjectInfo** se parado por dos puntos lo que tiene que devolver, para el caso es un arreglo de objetos, es decir que puede regresar varios objetos con toda la información que se declaró.

```
type Query {
  getAllObjectInfo:  [overviewInfoType]
  getOverview(_id: String): overviewInfoType
}
```

Para el caso de **getOverview** recibe un ID, y todos los paremetros que se recibirán en la consulta se deben agregar dentro de ese parentesis separado por coma, es dicr si también se quisiera realizar la consulta por el nombre debería agregarse el campo **(_id: String, name : String)** seguido de eso lo que retornará la consulta que en este caso regresa solo un objeto de **overviewInfoType** el cual contiuene toda la información declarada en el documento.

#### overviews_model.js

Este código es el modelo que se enviará al controlador para establecer las consultas y realizarlas, este modelo debe de tener los mismos campos, variables y tipos que **overviews_schema.graphql** para que pueda devolver toda la información correctamente, de no haber un campo que se ha declarado en el schema arrojará error y no se podrá ejecutar el servicio.

```javascript
import mongoose from 'mongoose';

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

  const Overviews = mongoose.model('genedatamarts',overviewInformationObject);
  export {Overviews};
```

La variable que se retorna es **Overviews** la cual se utilizara en el controlador, su uso dentro de este se explicará más adelante, la información definida dentro de la variable  **overviewInformationObject**  es la misma que se declaro en el schema.graphql. Dicha información será la que se obtenga de la base de datos.

Por ultimo en la linea siguiente se declara el Schema anterior como un modelo y realiza la conexión a la base de datos de **genedatamarts** y agrega el documento declarado anteriormente, que son los datos que podrán consultarte posteriormente.

```
  const Overviews = mongoose.model('genedatamarts',overviewInformationObject);
```

#### Overviews_controller.js

Este código es el controlador, primero se exporta el modelo para hacer uso de el, ya que es ahi donde se realizarán las consultas, seguido de ello se crean dos clases, o funciones segun se quiera trabajar, para este caso se eligieron clases, las cuales llevan el mismo nombre que los querys declarados en **overciews_schema.graphql** es importante mencionar que **deben tener el mismo nombre**

```javascript
import {Overviews} from '../overviewsService/overviews_model';

class overviewsController{
    static getAllObjectInfo(){
        return Overviews.find({})
    }

    static getOverview(_id){
        return Overviews.findOne({"_id":_id})
    }
}

export {overviewsController};
```

En las respectivas clases se tienen las consultas que hará cada clase cuando sea llamada, por ejemplo **getAllObjectInfo** usa un **.find({})** sin parametros dentro ya que regresará todos los objetos que encuentre.

Para el caso de **getOverview** recibe como parametro un **_id** y retorna la información que se le solicite de el objeto con ese ID, posteriormente se exporta el controlador para ser utilizado en el resolver, que se explicará a continuación.

#### Overviews_resolver.js

Cuando se define un Schema se le debe proveer de este método,  que será el que mapee el query, es decir, que cuando se realiza un query el resolver se encarga de realizar una llamada para su ejecución.

El código siguiente muestra el proceso del Resolver.

```javascript
import {overviewsController} from '../overviewsService/overviews_controller';
export const overviewsResolver = {
    Query: {
        getAllObjectInfo : (root) => overviewsController.getAllObjectInfo(),

        getOverview : (root,{_id}) => overviewsController.getOverview(_id)
   
   
    }
}
```

Se importa el controlador que será el que recibirá los parametros mediante el resolver, cuando se ejecuta un **Query** en especifico, por ejemplo **getOverview** llama al controlador y realiza la ejecución del query, cabe mencionar que **Query** es el apartado que se definió en el **Overviews_Schema.graphql** asi como el nombre de los querys **getAllObjectInfo y getOverview** es importante que tengan el mismo nombre para que el resolver y el controlador sepan qué deben ejecutar.

Si se desean realizar mutations o más querys deben agregarse tanto en **overviews_resolver.js, overviews_controller.js y principalmente en overviews_schema.graphql**



## Carpeta Raíz del servicio web

#### dbConnecion.js

Este código se encarga de realizar la conexión con la base de datos, se puede modificar las variables de entorno para cambiar de base de datos

```javascript
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

```

Se realiza la conexión y genera una promesa, cuando la promesa se resuelve regresa la conexión y es esta la que se importa para su posterior uso.



#### resolvers.js

Este resolver simplemente se encarga de hacer una union de los resolvers que existan, el código que se muestra a continuación muestra el cómo realizar el merge.

```javascript
import {mergeResolvers} from 'merge-graphql-schemas';
import {overviewsResolver} from './overviewsService/overviews_resolver';

export const resolvers = mergeResolvers([overviewsResolver]);
```

si se desean agregar más resolvers deben agregarse separados por una coma despues del  **overviewsResolver** y dentro de los corchetes.



#### Schema.js

Al igual que en el resolver se encarga de hacer una union de los schemas que haya pero en el siguiente código se muestra una pequeña linea de más.

```
import {mergeTypes} from 'merge-graphql-schemas';
import {gql} from 'apollo-server-express';
import fs from 'fs';


const Overviews = gql`${fs.readFileSync('./src/OverviewsService/overviews_schema.graphql').toString()}`;
export const typeDefs = mergeTypes([Overviews],{all:true});

```

Esta linea se encarga de leer el primer archivo creado, el **overviews_schema.graphql** se convierte a string para su lectura haciendo asi uso de la libreria fs y gql, posterior a ello se agrega dentro del **mergeTypes** todos los schemas que se puedan generar de otros servicios web.

## Index.js

 ```
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
 ```

En el index se importan los schemas y resolver, así como la conexión para crear el servidor web y el playground donde se podrán realizar finalmente las consultas, para ello se crea un servidor de apollo server y se le pasan como parametros los typedefs provenientes desde Schema y el resolver.

Una vez realizado todo esto, solo se ejecuta el comando **npm run start** y el servicio web estará en funcionamiento.

