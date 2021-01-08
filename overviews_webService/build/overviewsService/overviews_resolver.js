'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overviewsResolver = undefined;

var _overviews_controller = require('../overviewsService/overviews_controller');

const overviewsResolver = exports.overviewsResolver = {
  Query: {
    getAllObjectInfo: root => _overviews_controller.overviewsController.getAllObjectInfo(),

    getOverview: (root, { _id }) => _overviews_controller.overviewsController.getOverview(_id)

  }
}; /**
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