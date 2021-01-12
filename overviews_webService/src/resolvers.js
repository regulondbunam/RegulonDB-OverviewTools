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
import {mergeResolvers} from 'merge-graphql-schemas';
import {overviewsResolver} from './overviewsService/overviews_resolver';

export const resolvers = mergeResolvers([overviewsResolver]);

/**
	
# Functions description

## N/A

N/A

**/

