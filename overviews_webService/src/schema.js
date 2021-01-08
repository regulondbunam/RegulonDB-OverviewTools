/**
# Schema
	
## Description

Lee la estructura del Graphql y une los schemas del Overviews Service para despues retornarlo en una variable llamada typedefs

## Usage 

N/A

## Arguments/Parameters

    overviews_schema.graphql: Es la estructura que contiene los datos de la coleccion en mongoDB, así como también cuenta con los querys que se podran realizar

## Examples
N/A

## Return 
N/A

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: Edgar Enrrique Hernández Marcelo
**/

import {mergeTypes} from 'merge-graphql-schemas';
import {gql} from 'apollo-server-express';
import fs from 'fs';


const Overviews = gql`${fs.readFileSync('./src/overviewsService/overviews_schema.graphql').toString()}`;
export const typeDefs = mergeTypes([Overviews],{all:true});


/**
	
# Functions description
N/A
**/
