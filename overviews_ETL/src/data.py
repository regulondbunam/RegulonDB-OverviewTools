
'''#
# name : data.py

## synopsis
El programa realiza consultas a la base de datos devolviendo toda la información agrupada de dichas consultas
```python
N/A
```
## examples
```python
N/A
```

## description
El programa realiza consultas a la base de datos y retorna una variable con toda la información obtenida después de realizar la consulta
la información que retorna son todos los datos que existen por cada objeto al que se realiza la consulta, como el nombre del objeto, sus datos para la gráfica y sus datos para su graficación

## arguments
N/A
## requirements
Nombre de la base de datos
URL de la base de datos
Campo de la colección donde se obtendrá la ruta de la consulta y el objeto


## softwareRequirements
N/A
## memoryRequirements
N/A

## storageRequirements
N/A
## input
N/A
## output
N/A
__Return:__

__Type -__  __[Name]__ Description

Connection  cursor      Regresa la conexión en una variable

## [Program Code]

""'''""

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