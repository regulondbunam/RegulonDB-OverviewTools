/**
# [Web Service Name]
	
## Description

[Description details]

## Usage 

```javascript
&function(Parameters, if any);
```

## Arguments/Parameters

__[Name]:__ [Description]
__[Name]:__ [Description]

## Examples

[Example details]

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

__[Name]:__ [Description]
__[Name]:__ [Description]

__Return:__ 

__[Type]:__ [Name]
[Description (if necessary)]
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
