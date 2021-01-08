/**
# Overviews Model

## Description
Genera el modelo de las variables y datos que podran mostrarse desde un Schema de mongo

## Usage 

```javascript
&function(Parameters, if any);
```

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

RegulonDB Team: [full developer name]
**/


/**
	
# Functions description

## [Function name]

__Description:__ 

[Description of the function]


__Usage:__

```javascript
&function(Parameters, if any);
```

__Input arguments/parameters:__ 

_id: Es el ID del elemento que se buscará en el datamart y del cual se desplegara toda su informacion Ej. ECOLI001

__Return:__ 

 Object: regresa todos los campos que se establecieron en esta sección
[Description (if necessary)]
**/

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

  const Overviews = mongoose.model('genedatamarts',overviewInformationObject); //Cambiar geneDatamarts por la variable
  export {Overviews};