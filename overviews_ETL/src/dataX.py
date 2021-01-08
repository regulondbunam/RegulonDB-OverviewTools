
'''#
# name : dataX.py

## synopsis
Genera y retorna los datos que se van a graficar en el eje X
```python
N/A
```
## examples
```python
N/A
```

## description
El programa realiza una consulta a la base de datos la cual devuelve una agrupación de datos que se utilizarán para graficar datos en el eje X de la respectiva gráfica del objeto.

## arguments
N/A
## requirements
Nombre de la coleccion
Ruta de la consulta 
Conexión a la base de datos
## softwareRequirements
N/A
## memoryRequirements
N/A

## storageRequirements
N/A
## input
N/A
## output
Variable tipo Lista que almacena enteros
__Return:__

__Type -__  __[Name]__ Description

Connection  cursor      Regresa la conexión en una variable

## [Program Code]

""'''""


#Lista que obtendrá como llave los datos en X


#Función que recibe dos parametros, el ID: que será la variable con que se hará la consulta para los datos en X, y la colección de dónde se tomaran esos datos
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