

def data_for_axisY(id,collection):#id Contiene la ruta de cómo se quiere agrupar por ejemplo, agrupar por promotores: '$regulation.statistics.promoters'
    cursor = collection
    # Almacena en un arreglo los datos agrupados de genes, para su graficación en el eje Y
    data_graphics_y = []
    #Realizamos la consulta a mongo y guardamos los datos en el campo GENEEs
    group_yAxis = cursor.aggregate(
        [
            {
                "$group": {
                    "_id": id,
                    "total_genes": {"$sum": 1}, 
                }
            }
        ]
    )

    count = 0
    #Guardamos todos los promoteres que se encontraron dentro de una lista, que nos servirá para después sacar el nombre de los genes que tienen cierta cantidad de promotores
    for index in group_yAxis:
        data_graphics_y.append(index["total_genes"])
    
    return data_graphics_y
