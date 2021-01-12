/**
# Overviews Resolver
	
## Description

Ejecuta los Querys o Mutations declarados en el .graphql, se encarga de mandarlos a traer y se los envía al controller
de esta manera se ejecutan los querys correspondientes

## Usage 
N/A
## Arguments/Parameters

_ID: Es el identificador del elemento del cual se quiere obtener toda la informacion 


## Examples

El resolver funciona por si solo, cuando se ejecuta una consulta en el Playground el resolver se encarga de
obtener el tipo de consulta que se realizará y manda al controlador la orden de ejecutarla, si se requiere por ejemplo
realizar una consulta de un elemento especifico por su ID, entonces recoge el ID lo ingresa en el query respectivo
y se manda esa información al controlador para ejecutar la consulta.

## Return 
N/A

## Category

RegulonDB datamart web service

## License

MIT License

## Author 

RegulonDB Team: EDGAR ENRRIQUE HERNANDEZ MARCELO
**/
import {overviewsController} from '../overviewsService/overviews_controller';
export const overviewsResolver = {
    Query: {
        getAllObjectInfo : (root) => overviewsController.getAllObjectInfo(),

        getOverview : (root,{_id}) => overviewsController.getOverview(_id)
   
   
    }
}

/**
	
# Functions description

## N/A
**/

