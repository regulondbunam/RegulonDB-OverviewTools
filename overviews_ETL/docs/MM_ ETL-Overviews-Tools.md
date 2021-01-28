---

title : Manual de Mantenimiento ETL-Overviews-Tools
date : 2020-12-19
author : Edgar Enrrique Hernandez Marcelo
---

# Manual de Mantenimiento ETL Overviews Tools

[toc]

## Introducción

En este documento se describirá el estado en el que se encuentra actualmente el programa ETL Overviews Tools. El objetivo principal es describir la estructura de cada función, variable y librería que se utilizaron durante la realización de dicho programa. También se detallan los formatos de texto que se utilizaron así como la comunicación que extiste entre los subprogramas dentro del ETL.



## Estructura interna del programa ETL

A continuación se muestra la estructura del programa ETL *Figura 1.1*, posteriormente se detallaran cada uno de los programas que componen el ETL así como sus funciones.



![image-20201220124624743]()

*Figura 1.1 Estructura interna del programa ETL*



A continuacion se detalla cada uno de los programas que conforman el ETL.

## Connection.py

```
from pymongo import MongoClient

def mongo_connection(url,database,collection):
    client = MongoClient(url)
    db = client[database]
    cursor = db[collection]

    return (cursor)
```

Este programa hace uso de la libreria **pymongo**  para realizar la conexión a la base de datos, cuenta con una función llamada **mongo_connection** la cual recibe 3 parametros.

* **url**  recibe la direccion de la base de datos, ej. "localhost"
* **database** recibe el nombre de la base de datos a la cual se va a conectar
* **collection** recibe el nombre de la coleccion a la cual se realizara la conexion y consultas



Cuando la función es invocada se inicia un cliente de conexión a la base de datos, almacenando la conexión en la variable *client*

db almacena la conexion que se realizo a la base de datos, finalmente **cursor** es la variable que se retorna, teniendo la conexión a la base de datos seleccionada y a la colección seleccionada.

```python
	client = MongoClient(url)
    db = client[database]
    cursor = db[collection]
    return (cursor)
```



## __main__.py

A continuación se muestra todo el codigo del programa principal, posterior a ello se segmentaran partes del código para ser explicadas de  una manera más detallada.

``` python
import json
from connection import *
from data import *
import argparse
import logging
import sys



parser = argparse.ArgumentParser(description="Obtiene la dirección de la base de datos")
parser.add_argument('-u', '--url', type=str, required=True, help='URL de dónde se encuentra la base de datos')
parser.add_argument('-db', '--database', type=str, required=True, help='Nombre de la base de datos')
parser.add_argument('-ud', '--document', type=str, required=True, help='url del documento para tomar los datos')
parser.add_argument('-s', '--save', type=str, required=True, help="Ruta para guardar el JSON con todos los datos")
parser.add_argument('-lo', '--log', type=str, required=True, help="ruta para almacenar el log")
args = parser.parse_args()

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
           for collection_name, collection_objects in datamart.items():
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
                       "data": data_for_graphics["dataSummary"]
                   })

                   logging.info("adding data")
                   data.append(new_json_object.copy())




               logging.info("Creating JSON with the loaded data")
               with open(args.save + "\\OverviewTools.json", 'w') as f:
                   json.dump(data, f, indent=2)
       logging.info("End of program")
       print("File created successfully")
   except :
       #sys.exc_info()
       print("An error has ocurred...")
       a = ("An error of the type: ", sys.exc_info()[0], " has occurred")
       logging.error(a)

```

	#### Importación de librerias y programas

**Json** sirve para el manejo de archivos en este formato, lo importamos para poder hacer uso de todos sus metodos.

**connection.py** se importa para poder hacer conexiones a la base de datos

**data.py** se importa para poder obtener los datos agrupados

**argparse, sys** se importa para poder generar un programa que reciba argumentos desde su ejecucion desde la consola

**logging** Se importa para crear un log de  la ejecución del programa



```python
import json
from connection import *
from data import *
import argparse
import logging
import sys
```

		#### Definición de argumentos y creación del log

Se declaran los argumentos con la sintaxis siguiente:

Principalmente se crea una variable con el nombre **parser**  y hacemos uso de la libreria **argparse.ArgumentParser** para indicar que usaremos argumentos de entrada.

``` 
parser = argparse.ArgumentParser(description="Obtiene la dirección de la base de datos")
parser.add_argument('-u', '--url', type=str, required=True, help='URL de dónde se encuentra la base de datos')
parser.add_argument('-db', '--database', type=str, required=True, help='Nombre de la base de datos')
parser.add_argument('-ud', '--document', type=str, required=True, help='url del documento para tomar los datos')
parser.add_argument('-s', '--save', type=str, required=True, help="Ruta para guardar el JSON con todos los datos")
parser.add_argument('-lo', '--log', type=str, required=True, help="ruta para almacenar el log")
args = parser.parse_args()
```

Para agregar los argumentos que el programa requiere se declaran con la variable generada anteriormente **parser** seguida de **.add_argument** para añadir un argumento y entre parentesis agregaremos el cómo se referiran al argumento. Por ejemplo:

```
parser.add_argument('-u', '--url', type=str, required=True, help='URL de dónde se encuentra la base de datos')
```

**-u** es la forma minima de ingresar el argumento en la consola, de otra forma se tiene que escribir el argumento **--url** posteriormente y separado todo por coma, ingresamos el tipo de dato que se va a requerir en este ejemplo requiere un string agregandolo con **type=str** al ser requerido tambien se le pasa el parametro **required=True** con esto, al ser el programa ejecutado desde la consola se tiene que pasar el argumento o no se ejecutara el programa, finalmente se agrega una descripción al parametro creado con **help= "Descripcion del argumento"** esto con la finalidad de darle al usuario que ejecuta el programa el conocimiento de qué debe ir en el parametro seleccionado.



Para la creación del archivo log se usa el siguiente código

```python
LOG_FORMAT = '%(asctime)-5s %(name)-15s %(levelname)-8s %(message)s'
logging.basicConfig(
    filename=args.log+"\\log.log",
    format=LOG_FORMAT,
    level  = logging.DEBUG,
    filemode='w')
logger = logging.getLogger()
```

En este apartado creamos una configuración básica del archivo log, le asignamos una ruta y un nombre para guardar el log, en este caso lo guardamos con el nombre de **log.log** en la ruta que el usuario pase como argumento y escribimos el archivo. Los pasos de ejecución del log se crean durante el programa con la siguien  sintaxis:

```
logging.info(Mensaje de información)
```



#### Ejecucion del programa

Todo el programa esta dentro de un bloque try-exept para evitar posibles errores, posterior a ello tenemos las primeras lineas de código que son las sigueinte: 

```python
 with open(args.document, 'r') as file:
           datamart = json.load(file)#convertimos el archivo a formato Json
           logging.info("Initiating Cycle for data reading")
```

Con estas lineas abrimos el documento que se ha pasado por argumentos y lo transformamos a un archivo JSON. Todos los loggin.info son para mostrar la ejecución del programa en el archivo .log

A continuación empezamos la lectura del documento mediante un ciclo, el cual va a iterar los elementos principales, por ejemplo: Operon, Gene etc.

La lista **data** se utilizara para asignar todos los datos al final del las consultas, posterior a ello se agregara al Json final.

```python
 for collection_name, collection_objects in datamart.items():#Recorremos todos los objetos que haya dentro del documento
               data = []
               logging.info("Starting reading the document: " + collection_name)
```

El siguiente segmento de código itera entre cada elemento del objeto iterado anteriormente, es decir en todos los campos el objeto : Gene, Operon, etc.

```python
 for json_object in collection_objects:#Recorre todos los campos del objeto que se esta recorriendo en el ciclo superior

                   logging.info("Working with : "+collection_name+ " ID: "+json_object["_id"])
                   logging.info("Copying Object: "+collection_name)
                   
                   new_json_object = json_object.copy()#creamos una copia del objeto que se esta recorriendo 

                   logging.info(("Getting data for graph"))
                   graph = json_object["graph"]#creamos una variable que contendra los datos que vienen en el objeto en la parte de Graph
                   logging.info(("Title graph: "+graph["title"]))

                   logging.info(("Getting variables for queries..."))
                   query = json_object["query"]#almacenamos en la variable query la ruta que viene en el objeto en el campo query


                   datamart_object = query["datamart"]#la variable datamart_object contiene el datamart del objeto actual por ejemplo : Objeto Gene, datamart-> geneDatamart

                   logging.info("Connecting to the database:"+args.database+" Collection: "+datamart_object)
                   cursor = mongo_connection(args.url, args.database, datamart_object)#Realizamos la la conexión a la base de datos para extraer y agrupar los datos segun las consultas que realizaremos
                   query_route = query["x"]#obtiene el valor del campo query en su posición"x" del objeto actual, este valor es la ruta para hacer la consulta Ej. regulation.statistics.regulators
                   query_data_name = query["y"]#Obtiene el valor por el cual se agruparan los datos Ej. gene.name



                   logging.info("Getting names and id's")
                   data_for_graphics = get_name_id_gen('$' + query_route, query_route, cursor, query_data_name)#almacena los datos que retorna la función Get_name_id_gen
                   new_json_object.pop("query", None)

                   logging.info("updating data...")
                   new_json_object.update({#Actualizamos los datos al nuevo Json que se han extraido desde la base de datos
                       "data": data_for_graphics["dataSummary"]
                   })

                   logging.info("adding data")
                   data.append(new_json_object.copy())#Agregamos los datos que tiene el Json nuevo a nuestra lista DATA

```

El ultimo segmento de código adjunta a la ruta asignada en los argumentos de entrada el archivo que contiene todos los datos agrupados y las consultas echas.

```python

               logging.info("Creating JSON with the loaded data")
               with open(args.save + "\\OverviewTools.json", 'w') as f:#Creamos un archivo nuevo con el nombre OverviewTools.json, este archivo tendra todos los datos
                   json.dump(data, f, indent=2)
       logging.info("End of program")
       print("File created successfully")
```



## Data.py

El siguiente código realiza la a grupación de los datos según el objeto que este recorriendo la clase principal, para ello hace uso de dos programas más que se describiran más adelante. 

```python
from dataX import *
from dataY import *


def get_name_id_gen(query_route, mongo_field_object, collection, object_name):
    # Almacenamos en una variable los datos que vienen agrupados para el eje X
    group_yAxis = data_for_axisY(query_route, collection)
    group_xAxis = data_for_axisX(query_route, collection)
    cursor = collection  # Guardamos la colección en una variable para su recorrido

    # Generamos un diccionario para convertirlo después en un JSON con el atributo de Datamart
    overviewDetails = {}
    overviewDetails['dataSummary'] = []
    count = 0  # Contador que se encarga de la iteración  para el eje X

    for i in group_xAxis:
        lista = []
        entry = {}

        for item in cursor.find({
            mongo_field_object: i
        },
                {
                    "_id": 1,
                    object_name: 1
                }):
            gen_name = item["gene"]
            """ lista.append(item["_id"])
            lista2.append(gen_name["name"])   """

            entry = {'_id': item["_id"], 'name': gen_name["name"]}
            lista.append(entry)

        overviewDetails['dataSummary'].append({
            "xAxis": i,
            "yAxis": group_yAxis[count],
            "objectsRelated": lista

        })
        count = count + 1
        data_summary = overviewDetails

    return data_summary
```

A continuación se explica el código por segmentos.

#### importaciones

```python
from dataX import *
from dataY import *	
```

Se importan los dos programas que agrupan los datos para el archivo Json  en los campos  xAxys y yAxys 

```python

def get_name_id_gen(query_route, mongo_field_object, collection, object_name):
    # Almacenamos en una variable los datos que vienen agrupados para el eje X
    group_yAxis = data_for_axisY(query_route, collection)#Almacena una lista de números que son la cantidad de por ejemplo: Genes
    group_xAxis = data_for_axisX(query_route, collection)#Almacena una lista de números que son la cantidad de por ejemplo: Promotores
    cursor = collection  # Guardamos la colección en una variable para su recorrido
```

Especificando un poco las cosas, las funciones de  **group_xAxis y group_yAxis** devuelven valores numericos en una lista tanto para x como para y.



Este programa tiene una sola funcion, la cual recibe 4 argumentos, la ruta de donde se realizan las consultas a la coleccion de la base de datos, el campo en mongo de dicha consulta, el nombre de la colección y por ultimo el nombre del objeto que se esta recorriendo.

Se crean dos variables y cada variable manda a traer una respectiva función, para agrupar los datos en yAxis y en xAxis, a estas funciones se les pasa como argumentos la ruta y la colección.

```python
    # Generamos un diccionario para convertirlo después en un JSON con el atributo de Datamart
    overviewDetails = {}
    overviewDetails['dataSummary'] = []
    count = 0  # Contador que se encarga de la iteración  para el eje X
```

Se crea un arreglo diccionario vacío el cual se llenará con los datos segun se hayan encontrado.



En el siguiente segmento recorremos los datos que se han obtenido con las funciones anteriores de agrupar los datos en X y en Y.

Primero iteramos en la lista que trae los datos en X **group_xAxis** y creamos una lista que se rellenara con los datos agrupados para *X* y *Y* . Así como un diccionario que almacenará la agrupación de por ejemplo la cantidad de promotores que trabajan con cierta cantidad de genes.

El segundo ciclo itera entre los elementos de la colección, para encontrar el elemento que sea igual al iterador **i** del ciclo principal. Lo que hace es encontrar el elemento para después agrupar el elemento de Y. Cuando se encuentra obtiene el nombre y el id del objeto encontrado.

````python
 for i in group_xAxis:
        lista = []#Almacenará todos los elementos que se agruparon
        entry = {}#almacenará los sub-elementos que se agruparon para cada elemento en la lista anterior

        for item in cursor.find({
            mongo_field_object: i#Busca en la colección el elemento que sea igual al iterador
        },
                {#cuando se hace match en la busqueda se obtiene el id del elemento y su nombre
                    "_id": 1,
                    object_name: 1
                }):
            gen_name = item["gene"]

            entry = {'_id': item["_id"], 'name': gen_name["name"]}#almacenamos el nombre y el ID como un diccionario en entry
            lista.append(entry)#Agragamos el diccionario con los datos a la lista

        #Creamos el apartado de DataSummary que se agregara al Json generado
        overviewDetails['dataSummary'].append({
            "xAxis": i,#Contiene todos los datos en X que se encontraron en la función group_xAxis
            "yAxis": group_yAxis[count],#Contiene todos los datos que se encontraron con la función group_yAxis
            "objectsRelated": lista#Contiene los datos agrupados para cada elemento en x,y

        })
        count = count + 1
        data_summary = overviewDetails#asignamos el resultado a una variable nueva y la retornamos

    return data_summary
````

En resuen, lo que hace este segmento de código es iterar en la lista de X, y realizar una consulta para cada iteración cuando el resultado es encontrado se guardan lso datos en una variable para posteriormente en **overviewsDetails** ser asignado, siempre para el valor x,y en el apartado de **ObjectsRelated**.

## dataY.py

Función que recibe dos parametros **El nombre de la colección y la ruta de agrupamiento** por ejemplo **$regulation.statistics.promoters**, de esta forma se realizará la consulta agrupando por promotores.

```python
def data_for_axisY(id,collection):#id Contiene la ruta de cómo se quiere agrupar por ejemplo, agrupar por promotores: '$regulation.statistics.promoters'
    cursor = collection
    # Almacena en un arreglo los datos agrupados de genes, para su graficación en el eje Y
    data_graphics_y = []
    #Realizamos la consulta a mongo y guardamos los datos en el campo GENEEs
    group_yAxis = cursor.aggregate(
        [
            {
                "$group": {
                    "_id": id,
                    "total_genes": {"$sum": 1}, 
                }
            }
        ]
    )

   
    #Guardamos todos los promoteres que se encontraron dentro de una lista, que nos servirá para después sacar el nombre de los genes que tienen cierta cantidad de promotores
    for index in group_yAxis:
        data_graphics_y.append(index["total_genes"])
    
    return data_graphics_y

```

Este código realiza agrupamiento para los datos de la lista **data_graphics_y**, para ello se hace una simple consulta en mongoDB para el id dado, cada que se encuentre un elemento para cierto ID, realiza una suma y se la asigna al elemento del que se encontró, es decir si se encuentra que 100 elementos estan con el id : ECOLI002, los agrupa y los almacena en **group_yAxis** 

Posteriormente se realiza un ciclo que itera en la variable mencionada anteriormente, obteniendo para cada ID el agrupamiento de elementos que tuvo y se agregan a una lista nueva la cual se regresa cuando esta funcion sea llamada.

```python
  for index in group_yAxis:
        data_graphics_y.append(index["total_genes"])
    
    return data_graphics_y

```

## dataX.py

Al igual que **dataY.py** realiza una agrupación de elementos pero esta vez para los datos que se van a graficar en X

```python
def data_for_axisX(id,collection):#id Contiene la ruta de cómo se quiere agrupar por ejemplo, agrupar por promotores: '$regulation.statistics.promoters'
    cursor = collection
    key_object_group = []
    #Realizamos la consulta hacia mongo, agrupando los datos.
    group_xAxis = cursor.aggregate(
        [
            {
                "$group": {
                    "_id": id,
                    "total_genes": {"$sum": 1},
                }
            }
        ]
    )
    #Guardamos todos los promoteres que se encontraron dentro de una lista, que nos servirá para después sacar el nombre de los genes que tienen cierta cantidad de promotores
    for index in group_xAxis:
            key_object_group.append(index["_id"])

    #Regresamos la lista que contiene todos los elementos agrupados por genes
    return (key_object_group)
```

