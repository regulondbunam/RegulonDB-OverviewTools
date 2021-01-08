import { MDBDataTable } from "mdbreact";

const ModalTable = ({datos}) => {

    const {objectsRelated} = datos;
    
    let dataModal = [];
    let numColum = [];


    if(objectsRelated.leng<50){
        numColum[0].push({
            label: "Name",
            field: "name",
            sort: 'asc',
            width: 270,});
        numColum[1].push({label: "Name",
        field: "name",
        sort: 'asc',
        width: 270})
    }
    for(let i=0; i<objectsRelated.length;i++){
        dataModal.push({"name" : <a href="www.google.com">{objectsRelated[i].name}</a>})
    }
    

    const dataTable = {
        columns: [
          
          {
            label: "Name",
            field: "name",
            sort: 'asc',
            width: 270,
          }
        ],
        rows: dataModal,
      };
  
    return (  
        <MDBDataTable scrollY
        striped 
        sortable
        small 
        sorting={true}
        data={dataTable} 
    />
            
    );
}
 
export default ModalTable;