'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resolvers = undefined;

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _overviews_resolver = require('./overviewsService/overviews_resolver');

/**
# Resolver
	
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

const resolvers = exports.resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)([_overviews_resolver.overviewsResolver]);