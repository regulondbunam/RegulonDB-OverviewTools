import { useParams } from "react-router-dom";
import { getOverview } from "../graphql/QueryOverview";
import { useQuery } from "react-apollo";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { Cover } from "./ui-components/index";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import Datatable from "./overview_table";

function Grafica() {
  const id = useParams().id;

  const { data, error, loading } = useQuery(getOverview(id));

  if (loading) return <h2>loading...</h2>;
  if (error) {
    console.error(error);
    return <h1>Error...</h1>;
  }
  if (data) {
    const { getOverview } = data;
    const datos = getOverview.data;
    const { graph } = getOverview;
    const { description, labelY, labelX, footGraph } = graph;

    const dataX = [];
    const dataY = [];
    let data_for_graphic = [];
    let contNull = 0;

    //Agregamos los datos que vienen en un arreglo de objetos
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].xAxis !== null) {
        data_for_graphic[i] = { x: datos[i]?.xAxis, y: datos[i]?.yAxis };
      } else {
        contNull++; //Cada que se encuentre un null se agregara uno al contador para luego reducir el arreglo original
      }
    }

    //ordenamos de forma decreciente respecto a Y
    data_for_graphic.sort((a, b) => {
      if (a.y > b.y) {
        return -1;
      }
      if (a.y < b.y) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    //En dos listas agregamos los nuevos valores ya ordenados y disminuimos el tamanio original - los null que se encontraron
    for (let i = 0; i < datos.length - contNull; i++) {
      dataX.push(data_for_graphic[i].x);
      dataY.push(data_for_graphic[i].y);
    }

    const chartData = {
      dataBar: {
        labels: dataX,
        datasets: [
          {
            label: getOverview?.graph?.title,
            data: dataY,
            backgroundColor: "rgb(50,102,131)",
            borderWidth: 2,
            borderColor: ["rgb(50,102,131)"],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              barPercentage: 0.9,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };

    return (
      <>
        <Cover>
          <h1>Overviews Graphic {getOverview.graph.title}</h1>
        </Cover>

        <article>
          <p className="description">{description}</p>
          <h3 className="mt-5">Graphic</h3>

          <div className="container-graphic">
            <MDBContainer>
              <div className="float">
                <h4 className="label-y">{labelY}</h4>
                <Bar
                  className="barGraphic"
                  data={chartData.dataBar}
                  options={chartData.barChartOptions}
                />
              </div>
              <h4 className="label-x">{labelX}</h4>
              <p>{footGraph}</p>
            </MDBContainer>
          </div>

          <h3 className="mt-5">Data Overview</h3>
          <div className="container-table">
            <Datatable />
          </div>
        </article>
      </>
    );
  }
  return null;
}

export default Grafica;
//export default Grafica;
