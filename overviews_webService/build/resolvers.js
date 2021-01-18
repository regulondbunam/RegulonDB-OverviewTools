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

Realiza la union de todos los resolvers que existan de overviewsServices y otros servicios web si es que existen

## Usage 

Agregar dentro de resolvers el resolver que se quiere añadir dentro de corchetes y separado por comas por cada resolver.


## Arguments/Parameters
N/A
## Examples
 mergeResolvers([overviewsResolver,otroResolver,...resolverN]);

## Return 
N/A

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: EDGAR ENRRIQUE HERNANDEZ MARCELO
**/
const resolvers = exports.resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)([_overviews_resolver.overviewsResolver]);

/**
	
# Functions description

## N/A

N/A

**/