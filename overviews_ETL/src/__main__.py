'''#
# name: Overviews_tools.py

## synopsis
El programa es un ETL se encara realizar una extracción y transformación de datos que retornará como resultado un JSON con los datos filtrados

```python
para ejecutar el programa hay que abrir la consola de comandos, situarse en la carpeta donde se encuentra dicho programa con cd /ruta/programa y ejecutar de la siguiente forma:
__overviews_tools__.py -u "localhost" -db "name_database"  -ud "Ruta/documento/para/tomar/variables/de/consulta" -s "Ruta/para/guardar/el/json/generado" -lo "Ruta/para/guardar/el/log"

```
## examples

```python
put here your code example
```

## description
Éste programa requiere 5 parametros o argumentos que se requieren para su ejecución los cuales se listan a continuación: 
    Dirección de dónde se encuentra la base de datos
    Nombre de la base de datos 
    Ruta del documento para tomar las variables
Estos son los 3 requisitos o parametros principales para que el programa funcione adecuadamente
Los dos parametros siguientes son las rutas para almaacenar los archivos que regresa
    Ruta para guardar el JSON con todos los datos cargados
    Ruta para guardar el LOG de errores o información
    
## arguments

* -u, --url         especifica al programa la dirección de dónde se encuentra almacenada la base de datos
* -db,--database    especifica al programa el nombre de la base de datos a la cual se debe conectar
* -ud,--document    toma la ruta o url del documento del que se tomarán los datos necesarios como : campos de la colección para realizar las consultas, titulo, descripción etc.
* -s, --save        toma la ruta para guardar el JSON que se genera después de realizar todas las consultas y operaciones necesarias
*-lo, --log         toma la ruta para guardar un archivo .log en el que se especifica el cómo se ejecutó el programa o si hubo errores

* __Name__ Description

## requirements


## softwareRequirements
N/A
## memoryRequirements
N/A

## storageRequirements
[Storage requirements (free space required)]

## input
* __Input Format - __ __[Name]__ Description
JSON        overviewsData       Recibe un archivo JSON para la lectura de sus variables, rutas, datos etc.
## output
JSON        Overviews_tools     regresa un archivo tipo JSON con todos los datos cargados de overviews
log         log.log             regresa un documento.log en el que se obtiene un informe de la ejecución del programa
__Return:__

__Type -__  __[Name]__ Description

## [Program Code]

""'''""


import json
from connection import *
from data import *
import  argparse
import logging
import sys


#Creación de argumentos
parser = argparse.ArgumentParser(description="Obtiene la dirección de la base de datos")
parser.add_argument('-u', '--url', type=str, required=True, help='URL de dónde se encuentra la base de datos')
parser.add_argument('-db', '--database', type=str, required=True, help='Nombre de la base de datos')
parser.add_argument('-ud', '--document', type=str, required=True, help='url del documento para tomar los datos')
parser.add_argument('-s', '--save', type=str, required=True, help="Ruta para guardar el JSON con todos los datos")
parser.add_argument('-lo', '--log', type=str, required=True, help="ruta para almacenar el log")
args = parser.parse_args()

#Creación del archivo log
LOG_FORMAT = '%(asctime)-5s %(name)-15s %(levelname)-8s %(message)s'
logging.basicConfig(
    filename=args.log+"\\log.log",
    format=LOG_FORMAT,
    level  = logging.DEBUG,
    filemode='w')
logger = logging.getLogger()


if __name__=='__main__':
   logging.info("Start program execution")
   try:
       with open(args.document, 'r') as file:
           datamart = json.load(file)
           logging.info("Initiating Cycle for data reading")

           for collection_name, collection_objects in datamart['collectionData'].items():
               data = []
               logging.info("Starting reading the document: " + collection_name)

               for json_object in collection_objects:

                   logging.info("Working with : "+collection_name+ " ID: "+json_object["_id"])
                   logging.info("Copying Object: "+collection_name)


                   new_json_object = json_object.copy()

                   logging.info(("Getting data for graph"))
                   graph = json_object["graph"]
                   logging.info(("Title graph: "+graph["title"]))

                   logging.info(("Getting variables for queries..."))
                   query = json_object["query"]


                   datamart_object = query["datamart"]

                   logging.info("Connecting to the database:"+args.database+" Collection: "+datamart_object)
                   cursor = mongo_connection(args.url, args.database, datamart_object)
                   query_route = query["x"]
                   query_data_name = query["y"]



                   logging.info("Getting names and id's")
                   data_for_graphics = get_name_id_gen('$' + query_route, query_route, cursor, query_data_name)
                   new_json_object.pop("query", None)

                   logging.info("updating data...")
                   new_json_object.update({
                        "_id":(json_object['queryName']+json_object['graph']['graphType']),
                       "data": data_for_graphics["dataSummary"]
                   })

                   logging.info("adding data")

                   data.append(new_json_object.copy())

               collectionDataJson = {
                       "collectionData": data,
                       "classAcronym": datamart['classAcronym'],
                       "subclassAcronym": datamart['subclassAcronym'],
                       "collectionName": datamart['collectionName']
               }

               #collectionDataJson['collectionData'].append(data)

               logging.info("Creating JSON with the loaded data")
               with open(args.save + "\\OverviewTools.json", 'w') as f:
                   json.dump(collectionDataJson, f, indent=2)
       logging.info("End of program")
       print("File created successfully")
   except :
       #sys.exc_info()
       print("An error has ocurred...")
       a = ("An error of the type: ", sys.exc_info()[0], " has occurred")
       logging.error(a)

'''#

dateCreated: [2020-10-28] -  author: Edgar Enrrique Hernández Marcelo

dateModified [YYYY-MM-DD] - contributor: [describe the modification]

#'''


'''#

### [Subroutine name]

__description:__

[Description of the subroutine]

__usage:__

```python

&Subroutine(Parameters, if any);

```

__input parameter:__  

* __Param - __ __[Name]__ Description

__output:__  

* __Type - __ __[Name]__ Description

__return:__  

* __Type - __ __[Name]__ [Description (if necessary)]

__exception:__  

*__Category (Error, Warning or Message)__ [Description of the exception ()]

#'''






