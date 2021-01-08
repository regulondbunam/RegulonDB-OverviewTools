'''#
# name : connection.py

## synopsis
Realiza la conexión con la base de datos
```python
N/A
```
## examples
```python
N/A
```

## description
Realiza la conexión con la base de datos y retorna dicha conexión mediante una función 

## arguments
N/A
## requirements
Nombre de la base de datos
URL de la base de datos
Estos datos se envían desde el programa principal.

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

import pymongo
from pymongo import MongoClient

def mongo_connection(url,database,collection):
    client = MongoClient(url)
    db = client[database]
    cursor = db[collection]

    return (cursor)
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