"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.overviewsController = undefined;

var _overviews_model = require("../overviewsService/overviews_model");

class overviewsController {
    static getAllObjectInfo() {
        return _overviews_model.Overviews.find({});
    }

    static getOverview(_id) {
        return _overviews_model.Overviews.findOne({ "_id": _id });
    }
} /**
  # Overviews Tools Web Service
  	
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

exports.overviewsController = overviewsController;