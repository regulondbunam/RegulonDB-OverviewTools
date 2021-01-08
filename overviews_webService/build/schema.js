'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.typeDefs = undefined;

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _apolloServerExpress = require('apollo-server-express');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Overviews = _apolloServerExpress.gql`${_fs2.default.readFileSync('./src/overviewsService/overviews_schema.graphql').toString()}`; /**
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

const typeDefs = exports.typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([Overviews], { all: true });