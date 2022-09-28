import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetTicket } from '../Actions/TicketingAction';
import ErrorBar from './ErrorBar';
import LoadingBar from './LoadingBar';
var XLSX = require("xlsx");

function CompListTicket(props) {
const dispatch = useDispatch();

const {
  ReturnLoadingIT ,
  ReturnStatusIT ,
  ReturnDataIT ,
  ReturnMessageIT 
} = useSelector((state) => state.TicketingReducer)

  useEffect(() => {
     
    dispatch(GetTicket("-",props.Type))
  }, [])



  const Content =() =>{


    const [DataTicket, setDataTicket] = useState(ReturnDataIT)

    const columns = [
      {
          name: 'Id Ticket',
          selector: row => "#" + row.Id,
      },
      {
          name: 'Subject',
          selector: row => row.Subject,
      },
      {
        name: 'Requestor',
        selector: row => row.Requestor,
    },
    {
      name: 'Request DateTime',
      selector: row => row.DateTime,
  },
  {
    name: 'Status',
    selector: row => props.Type == "GetHistoryAssigmentTicket" ?  row.StatusName + " By " + row.Technician : row.StatusName,
},

{
  name :'Action',
  cell : row =>
  
    localStorage.getItem('IsHelpdesk') == "0" && row.Status == "2" && props.Type== "PendingTicket" ? 
     <button className='btn btn-danger'>Cancel</button> :
     localStorage.getItem('IsHelpdesk') == "1" && row.Status == "2" && props.Type== "PendingTicket" ? 
     <Link  params={{ Id: row.Id }} to={"/ListTicket/"+row.Id} className='btn btn-warning'>Detail </Link> : 
     props.Type== "GetListPickTicket" ? 
     <Link  params={{ Id: row.Id }} to={"/ListPickTicket/"+row.Id} className='btn btn-danger'>Execute</Link> 
     : props.Type == "GetHistoryAssigmentTicket" ?
     <button data-toggle="modal" data-target="#DetailAssigmentTicket"  className='btn btn-primary'>Detail</button> :
     "-"
    //  DetailAssigmentTicket
}
  ];
  


    const ExportExcel =() =>{
      // alert("Tester")
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(ReturnDataIT);
      XLSX.utils.book_append_sheet(wb,ws,"Sheet 1");
      XLSX.writeFile(wb,"MyExcel.xlsx")
  }

  const SearchDataBySubject =(data) => {
    if(Array.isArray(DataTicket)){
    const Result = DataTicket.filter((res)=>{
        return res.Subject.toLowerCase().match(data.toLowerCase());
     })
     setDataTicket( data == "" ? ReturnDataIT : Result)
    }
}

    return(
      <div>
        {
            props.Type == "PendingTicket" 
            ? 
            <div>
            <Link to={"/RequestTicket"} className='btn btn-primary'>
            Request Ticket
    
            </Link>
            <br/><br/>
            </div>
             : ""
        }


        {
                        ReturnLoadingIT ? 
                        <LoadingBar/>
                        : ReturnStatusIT  == "1"   ? 
                        
                        <DataTable
                        // title={"Call Result"}
pagination={true}
            columns={columns}
            data={Array.isArray(DataTicket) ? DataTicket : ReturnDataIT}
            // selectableRows
            highlightOnHover
            subHeader
            subHeaderComponent={
               ReturnMessageIT!="0" ?
            <input type={"text"} placeholder="Search Ticket"
            onChange={
                (e) => {
                    SearchDataBySubject(e.target.value)
                }
            }
            /> : ""
        }
        actions={
          ReturnMessageIT!="0" ?
<button onClick={ExportExcel} className='btn btn-success'>Export To Excel</button>
 : ""
        }
        />
                        :

                        
                
                        <ErrorBar message={ReturnMessageIT}/> 
                    }
  <div className="modal" id="DetailAssigmentTicket">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Detail Ticket</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">
          <div className='row'>
              <div className='col-md-4'>
                <label>Requestor</label>
                <input className='form-control' type={"text"}/>
              </div>
              <div className='col-md-4'>
                    <label>Subject</label>
                    <input className='form-control' type={"text"}/>
              </div>
              <div className='col-md-4'>
                    <label>Technician</label>
                    <input className='form-control' type={"text"}/>
              </div>
          </div>
          <div className='row'>
                    <div className='col-md-8'>
                      <label>Description</label>
                      <textarea className='form-control'></textarea>
                    </div>
          </div>

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
      </div>
    )
  }
  

  return (
    
      <Content/>
      

  )
}

export default CompListTicket