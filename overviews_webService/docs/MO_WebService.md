---
typora-root-url: img-webService
---

```markdown
title: Manual de operación - Servicio web Overviews Tools
date: 2020-12-22
author: Edgar Enrrique Hernandez Marcelo
```

# Manual de operación - Servicio web Overviews Tools

[toc]



## Introducción 

En el siguiente manual se da a conocer el funcionamiento del servicio web para su posterior uso, tambien se da a conocer su ambiente de operación, la forma de realizar las consultas, el cómo ejecutarlo etc.



## Definiciones, abreviaturas y acrónimos.

* RAM :Memoria de Almacenamiento Variable
* CMD : Consola de Mandos

## Condiciones de funcionamiento

#### Requisitos de Hardware 

El servicio web ha sido probado en Laptop Asus FX553V con 16GB de memoria RAM y un procesador Intel Core i5 de 5ta generación.

* Procesador Intel core 3ra Generación en adelante
* 8 GB de memoria RAM

#### Requisitos del software

El programa fue ejecutado en versiones de Windows 10 Single Lenguaje y Ubuntu 20.0. para su correcta ejecución será necesario tener instalado los siguientes requisitos:

* SO Windows 10 (Cualquier versión)
* Node V10 o mayor



## Ejecución del servicio web

### Ejecución por consola de comandos

Para ejecutar el servicio mediante la consola de comandos escribiremos en windows la tecla **Windows+R** y escribiremos **CMD** y posteriormente en aceptar para abrir la consola, como se muestra en la *figura 1.0*.



![Captura](/Captura.JPG)

​																	*Figura 1.0 Ejecución de la consola*

Al abrir la consola de comandos, nos dirijiremos a la carpeta que contiene nuestro servicio web, para ello podemos hacer uso del comando **cd ruta/de/la/carpeta** como se muestra en la figura 1.2

![consola2](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\consola2.JPG)

​									*Figura 1.2 Posicionamiento en la carpeta del servicio web*

una vez dentro de la carpeta ejecutaremos el comando **npm run start** como se muestra en la figura 1.3

![ejecucion-servicio-web](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\ejecucion-servicio-web.JPG)

​									*Figura 1.3 ejecución del servicio web*



## Ejecucion por editor de texto

Se recomienda el uso de **Visual Studio Code** para la ejecución mediante un editor de texto, para ejecutar el servicio web primero abriremos la carpeta que contiene el servicio web con dicho editor de texto, como se muestra en la figura 1.4 

VSCWebService

​														*Figura 1.4 Web Service en Editor de texto*

Posteriormente abriremos una terminal haciendo click en **terminal --> nueva terminal ** y dentro de la terminal ejecutaremos el comando **npm run start** como se muestra en la figura 1.5

![ejecucionVSC](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\ejecucionVSC.JPG)

​										*Figura 1.5 ejecucion del servicio web*

Para poder acceder al playground y hacer consultas se puede hacer click en el link que nos proporciona la terminal o bien, escribir la siguiente dirección en el navegador   http://localhost:4000/ lo que nos llevará a una pantalla como la que se muestra en la figura 1.6

![Playground](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\Playground.JPG)

​						*Figura 1.6 Interfaz del servicio web - Playground*

Desde aqui se pueden realizar las 2 consultas que estan preestablecidas dentro del servicio web, las cuales son mostrar todos los objetos que hay dentro de la base de datos, por ejemplo *Genes, Operon etc.* y para mostrar un objeto hijo para este caso se necesita pasar su respectivo ID.

Para conocer los datos que el servicio web puede regresar, se puede dar click en DOCS en la parte derecha y visualizar todas las variables, son estas las que nos regresaran cierta información, la imagen siguiente muestra un ejemplo

![pg2](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\pg2.JPG)

​							*Figura 1.7 Datos para mostrar*

Para realizar consultas al servicio web se deben realizar de la siguiente manera:

```json
{
  getAllObjectInfo{
    _id
  	queryName
    objectType
    data{
      xAxis
      yAxis
      objectsRelated{
        _id
        name
      }
    }
  }
}
```

Siendo **getAllObjectInfo** el objeto principal donde se realizará la consulta, y siendo los demás campos los datos que se quieren obtener, en la imagen 1.8 se muestra la ejecución del código, para ejecutarlo basta con dar click en el botón de **Play**

![pg3](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\pg3.JPG)

​									*Figura 1.8 Resultados de la consulta*

Para realizar la búsqueda o consulta de un solo elemento basta con pasarle el ID y hacer la consulta en su respectivo objeto, puede ejecutar la consulta siguiente en el playground.

````json
{
  getOverview(_id:"RDBECOLIOV00001"){
  	queryName
    objectType
 
    data{
      xAxis
      yAxis
      objectsRelated{
        _id
        name
      }
    }
  }
}
````

Con esta consulta se obtienen ciertos campos de información, la consulta se realiza a **getOverview** para un solo elemento del arreglo padre, entre parentesis se pasa la variable **_id** seguida del id que se desea consultar, la imagen siguiente muestra el resultado de la ejecución de la consulta.

![pg4](C:\Users\herna\Dropbox\RegulonDB-OverviewTools-Edgar\3.Desarrollo\Cierre\Manuales\img-webService\pg4.JPG)

​							Figura 1.9 Consultas individuales