---

title: Manual de Operacion ETL Overviews Tools

date: 2020-12-19

author: Edgar Enrrique Hernández Marcelo

---

# Manual de operación : ETL Overviews Tools

[toc]





## Introducción

 El presente documento contiene la información necesaria para el uso del programa ETL Overviews Tools, así como la información sobre los requisitos para poder ser ejecutado, el ambiente de operación, etc.



##  Definiciones, abreviaturas y acrónimos

SO : Sistemas Operativos

JSON : Formato de texto (Javascript Object Notation)

MongoDB: Sistema de base de datos no relacional y orientada a documentos

GB : Unidad de medida de almacenamiento informatico (Gigabyte)

RAM : Memoria de acceso aleatorio

CMD: Consola de Comandos



## Condiciones del funcionamiento

A continuación, se describen los requisitos mínimos para la ejecución del programa.

#### Requisitos de Hardware 

El programa ha sido probado en Laptop Asus FX553V con 16GB de memoria RAM y un procesador Intel Core i5 de 5ta generación.

* Procesador Intel core 3ra Generación en adelante
* 8 GB de memoria RAM

#### Requisitos del software

El programa fue ejecutado en versiones de Windows 10 Single Lenguaje y Ubuntu 20.0. para su correcta ejecución será necesario tener instalado los siguientes requisitos:

* SO Windows 10 (Cualquier versión)
* Python V3.7 o mayor



## Ejecución del programa

El programa se ejecuta a traves de la consola de comandos, para ello seguir los pasos que se detallan a continuación: 

 Abrir la consola de comandos para el caso de Windows puede hacer uso de las teclas **Windows + R** y a continuación escribir **CMD**, como se muestra en la *figura 1.0.*



​												

![Comando Ejecutar](/home/eedgar/.config/Typora/typora-user-images/image-20201219190239860.png)

​																	Figura 1.0 Ejecucion del CMD 

​		



Para ejecutar el programa debemos situarnos en la carpeta donde se encuentra, para acceder a la carpeta haremos uso del comando cd “Ruta/del/programa” como se muestra en la *figura 1.2.*



![image-20201219190908619](/home/eedgar/.config/Typora/typora-user-images/image-20201219190908619.png)

*Figura 1.2 posicionamiento en la carpeta del programa*



Una vez situados dentro de la carpeta, para ejecutar el programa usaremos el comando siguiente:

```python
Python __main__.py -u “url/base/de/datos” -db “nombre-base-de-datos” -ud “ruta/documento/de/variables/para/consultas” -s “ruta/donde/se/guardara/el/json/creado/” -lo “ruta/para/guardar/el/archivo/log”
```

A continuación, se explica cada uno de los parámetros para la ejecución y funcionamiento adecuado. 


**Python:** Comando para que se interprete el código como lenguaje python.

**__main__.py**: Nombre del programa principal que se va a ejecutar

El parámetro **-u** recibe el  URL o dirección donde esta alojada la base de datos de la cual se extraerá la información, ejemplo : “localhost”

El parámetro **-db** recibe el nombre de la base de datos. Ej. “Datamarts”

El parámetro **-ud** recibe el nombre del documento que contiene las variables que se obtendrán para realizar la consulta. Ej. “C://datos.json”

El parámetro **-s** recibe la ruta de donde se desea guardar el archivo que traerá los datos nuevos. Ej. “C://Documents”

El parámetro **-lo** recibe la ruta de donde se desea guardar el archivo que trae información sobre la ejecución del programa Ej.  “C://Documents”



## Ejemplo de ejecución



En la figura 2.0 se muestra que existe una carpeta en el disco local C, que contiene el archivo donde se extraerán los datos de consulta, este archivo pasara como el parámetro -**ud.**

![image-20201219191151629](/home/eedgar/.config/Typora/typora-user-images/image-20201219191151629.png)

​			*Figura 2.0 Datos para el parametro -ud*

Nos situamos en la consola y ejecutamos el comando que se menciono en el punto 3, esta vez con parametros reales, como se muestra en la *figura 2.1*

![image-20201219191227563](/home/eedgar/.config/Typora/typora-user-images/image-20201219191227563.png)

​		*Figura 2.1 Ejecución del programa*

Al ejecutarlo nos aparecerá un mensaje, si el archivo se creo correctamente se mostrara el mensaje “**File created successfully”** de lo contrario se mostrara un mensaje de error, el cual se puede visualizar en el archivo de log.

Si el programa se ejecuto correctamente se habrán creado dos archivos, como se muestra en la *figura 2.2*

![image-20201219191300707](/home/eedgar/.config/Typora/typora-user-images/image-20201219191300707.png)

​	*Figura 2.2 creación correcta de los archivos*

El archivo log muestra los pasos de ejecución del programa, como se muestra en la *figura 2.3*

![image-20201219191325739](/home/eedgar/.config/Typora/typora-user-images/image-20201219191325739.png)

​	*Figura 2.3 pasos de ejecución*



 El archivo OverviewTools muestra todos los datos consultados en formato Json, como se muestra en la *figura 2.4*

![image-20201219191419017](/home/eedgar/.config/Typora/typora-user-images/image-20201219191419017.png)

​	*Figura 2.4 datos procesados*







 