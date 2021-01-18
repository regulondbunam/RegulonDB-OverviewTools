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

const typeDefs = exports.typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([Overviews], { all: true });

/**
	
# Functions description
N/A
**/