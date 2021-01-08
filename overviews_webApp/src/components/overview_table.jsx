import { useParams } from "react-router-dom";
import { getOverview } from "../graphql/QueryOverview";
import { MDBDataTable } from "mdbreact";
import { useQuery } from "react-apollo";
import { Modal } from "./ui-components/index";
import ModalTable from './overview_modal_table';


const Datatable = () => {
  const id = useParams().id;
  const { data, loading, error } = useQuery(getOverview(id));

  if (loading) return <h2>Loading...</h2>;
  if (error) {
    console.log("Ah ocurrido un error " + error);
  }
  if (data) {
    const {getOverview} = data;
    const {graph} = getOverview;
    const {labelY, labelX} = graph;

    const datos = getOverview.data;
    const jsonData = [];

    for(let i=0; i<datos.length;i++){
        if(datos[i].xAxis===null){
            jsonData.push({
              "labelX":"Without Info",
              "labelY":datos[i]?.yAxis,
              "download":
              <Modal title="See Data">
                <ModalTable datos={datos[i]}/>
              </Modal>});
        }
        else{
            jsonData.push({"labelX":datos[i]?.xAxis,"labelY":datos[i]?.yAxis,"download":
            <Modal title="See Data">
              <ModalTable datos={datos[i]}/>
            </Modal>});
        }
    }




    const dataTable = {
      columns: [
        
        {
          label: labelX,
          field: "labelX",
          width: 270,
        },
        {
          label: labelY,
          field: "labelY",
          width: 150,
        },
        {
          label: "BTN Download",
          field: "download",
          width: 200,
        },
      ],
      rows: jsonData,
    };


    
    return (
      <>
      <h1>Tabla de datos</h1>
        <MDBDataTable 
            striped 
            sortable
            small 
            sorting={true}
            data={dataTable} 
        />
      
      </>
    );
  }
};

export default Datatable;
