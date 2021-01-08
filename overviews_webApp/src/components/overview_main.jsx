import Querys from "../graphql/Querys";
import { useQuery } from "react-apollo";
import { Cover } from "./ui-components/index";
import Acordion from "./overviews_acordion";

function Main() {
  const { data, loading, error } = useQuery(Querys);
  if (error) return <h2>Error...</h2>;
  if (loading) return <h2>loading...</h2>;
  if (data) {
    const { getAllObjectInfo } = data;

    //Declaramos un nuevo objeto que almacenara la agrupación de titulos
    let groupByObject = [];
    let objectNames = [];

    getAllObjectInfo.forEach((element) => {
      //Comprobamos si no existe el nombre por el cual agruparemos, por ejemplo (GENE), si no existe, lo agregamos
      if (!groupByObject.hasOwnProperty(element.objectType)) {
        //Creamos el objeto y lo inicializamos con el arreglo de titulos de las graficas
        groupByObject[element.objectType] = {
          title: [],
        };
      }
      //Agregamos los datos de los titulos
      groupByObject[element.objectType].title.push(element.graph.title);
    });
    //obtenemos los Nombres principales de agrupamiento y los almacenamos en un arreglo
    for (let key in groupByObject) {
      objectNames.push(key);
    }
    return (
      <>
        <Cover>
          <h1>Overviews</h1>
        </Cover>
        <article>
       

          {getAllObjectInfo.map((element) => {
            return (
              <div key={`link-${element._id}`}>
                <a
                  href={`/overviews/${element._id}`}
                  key={element._id}
                  id={element._id}
                >
                  {element.graph.title}
                </a>
                <br />
              </div>
            );
          })}

          {objectNames.map((nameObject) => {
            return(
              <Acordion key = {nameObject} nameObject={nameObject} groupByObject={groupByObject}/>

            )
          })}

        </article>
      </>
    );
  }
}

export default Main;
