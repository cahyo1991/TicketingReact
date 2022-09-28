import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import { GetTicket,AssignTicket, GetTechnician } from '../../Actions/TicketingAction';
import ErrorBar from '../../Component/ErrorBar';
import LayoutAdmin from '../../Component/LayoutAdmin';
import LoadingBar from '../../Component/LoadingBar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertError from '../../Component/AlertError';
import axios from 'axios';
import AlertLoading from '../../Component/AlertLoading';
import swal from 'sweetalert';
import AlertSuccess from '../../Component/AlertSuccess';
import CompDetailTicket from '../../Component/CompDetailTicket';


function DetailTicket({hideLoader}) {
    const {Id} = useParams();

    
    const Content = () =>{

        const dispatch = useDispatch()
        useEffect(() => {
          hideLoader()
          document.title = "Detail Ticket | "  + global.AppName
          if (!localStorage.getItem("Token")) {
            window.location = "/"      
          } 
          if (localStorage.getItem("IsTicketing") != "1") {
            window.location = "/Modul"      
          }
               dispatch(GetTicket(Id))
               dispatch(GetTechnician())
            
        }, [Id])

        

        const {
            ReturnStatusIT ,
            ReturnDataIT ,


            ReturnLoadingASS ,
            ReturnStatusASS ,
            ReturnDataASS ,
            ReturnMessageASS 

          } = useSelector((state) => state.TicketingReducer)
            const [Resolution, setResolution] = useState('') 
            const [CodeTechnician, setCodeTechnician] = useState(localStorage.getItem('NIK'))
            const [StatusForm, setStatusForm] = useState(null)
            const [ListTechnician, setListTechnician] = useState('E0179')

          const navigate = useNavigate()
            const SubmitResolution = () =>{
                console.log("Resolution",Resolution)
                if (Resolution.length > 15) {
                    AlertLoading()
            
                    axios.post(global.Api+'InputResolutionTicket',JSON.stringify({
                        ResolutionTicket : Resolution,
                        IdTicket : Id,
                        Code : localStorage.getItem('NIK')
                    }),{
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token' : localStorage.getItem("Token")
                        }
                    }).then(
                        res =>{
                            setTimeout(
                                ()=>{
                                    if (res.data.Status == "1") {
                                                          
                                                          swal.close()
                                                          AlertSuccess("Success","Success Insert Resolution")
                                                          setTimeout(
                                                            ()=>{
                                                                navigate('/ListTicket')
                                                            },1000
                                                          )
                                    } else {
                                        swal.close()
                                        AlertError("Error",res.data.Message)
                                        setTimeout(()=>{
                                            window.location = "/ListTicket"
                    
                                        },1000) 
            
                                    }
            
                                },2000
                            )
                        }
                    ).catch(
                        Error =>{
                            if (Error.response.data.Message) {
                                if (Error.response.data.Message == "jwt expired") {
                                    swal.close()
                                    AlertError("Login Expired",Error.response.data.Message)
                                    localStorage.clear();
                                    setTimeout(()=>{
                                        localStorage.clear();
                                        window.location = "/"
                
                                    },1000)                        
                                }
                                else{
                                    swal.close()
                                    AlertError("Error",Error.response.data.Message)
                                    console.log("Error Cek",Error)
                                    setTimeout(()=>{
                                        window.location = "/ListTicket"
                
                                    },1000) 
                                    
                                }
                            }
                        }
                    )
                } else {
                    AlertError("Error","Please Fill The Resolution")
                }
            }


           const PickTicket = (IsAsign) =>{
            AlertLoading()
            // console.log("technician code",IsAsign ? ListTechnician : CodeTechnician)
            // console.log("IsAsign",IsAsign)
            axios.post(global.Api+'AssignTicket',JSON.stringify({
                NikTechnician : IsAsign ? ListTechnician : CodeTechnician,
                IdTicket : Id,
                Code : localStorage.getItem('NIK')
            }),{
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token' : localStorage.getItem("Token")
                }
            }).then(
                res =>{
                    setTimeout(
                        ()=>{
                            if (res.data.Status == "1") {
                                if (IsAsign) {
                                    swal.close()
                                    AlertSuccess('Success','Assigment Ticket Is Success')
                                    navigate('/ListTicket')
                                } else {
                                    setStatusForm('3')
                                    swal.close()                                    
                                }

                            } else {
                                swal.close()
                                AlertError("Error",res.data.Message)
                                setTimeout(()=>{
                                    window.location = "/ListTicket"
            
                                },1000) 
    
                            }
    
                        },2000
                    )
                }
            ).catch(
                Error =>{
                    if (Error.response.data.Message) {
                        if (Error.response.data.Message == "jwt expired") {
                            swal.close()
                            AlertError("Login Expired",Error.response.data.Message)
                            localStorage.clear();
                            setTimeout(()=>{
                                localStorage.clear();
                                window.location = "/"
        
                            },1000)                        
                        }
                        else{
                            swal.close()
                            AlertError("Error",Error.response.data.Message)
                            console.log("Error Cek",Error)
                            setTimeout(()=>{
                                window.location = "/ListTicket"
        
                            },1000) 
                            
                        }
                    }
                }
            )

          }


          const   modules = {
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                  { align: [] }
                ],
                ["link"],
                ["clean"]
              ],
            //   handlers: { image: this.imageHandler }
            },
            clipboard: { matchVisual: false }
          };
          
        return(
          
            <div>
         
       <CompDetailTicket Id={Id} IsHitory={false}/>

            <div className='row' style={{marginTop:80}}>
                
                <div className="col-sm-4 col-md-4 col-lg-4">
                    
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                <div className='row'>

                        {
                            ReturnStatusIT ? 
                            localStorage.getItem('IsHelpdesk') == "1" && ReturnDataIT[0].Status == "2"
                            && StatusForm  == null 
                            ?

                            <div>
                            <button onClick={()=>PickTicket(false)} style={{marginRight:20}} className='btn btn-primary'><i className="fas fa-plus-circle"></i> PICK</button> 
                            <button data-toggle="modal" data-target="#myModal" className='btn btn-success'> <i className="fas fa-chalkboard-teacher"></i> ASSIGN</button>
                            </div>
                            : "" :""
                        }  
                    </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                    
                </div>
                
            </div>

{
    StatusForm!=null ?
    <div>
        <div className='row' style={{height:280,padding:10,marginTop:100}}>

<ReactQuill  
theme="snow" value={Resolution} onChange={setResolution} style={{width:'100%',marginTop:-109}} modules={modules} 
placeholder="Describe Your Resolution"
/>
</div>
<div className='row' style={{marginTop:100}}>
<button className='btn btn-primary' onClick={SubmitResolution}>SUBMIT RESOLUTION</button>

</div>
    </div> : ""
}




<div className="modal" id="myModal">
    <div className="modal-dialog">
      <div className="modal-content">
      

        <div className="modal-header">
          <h4 className="modal-title">Assign Ticket</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
 
        <div className="modal-body">
          <label>List Technician  </label>
          <select className='form-control' onChange={(res)=> setListTechnician(res.target.value)}>
            
          {
            ReturnStatusASS ?  
            ReturnDataASS.map((item,index)=>(
                <option key={index} value={item.NIK}>{item.FullName}</option>
            ))
            :""
          }
</select>
          <br/>
          <button className='btn btn-primary' data-dismiss="modal"
          onClick={
            ()=>{
                ListTechnician == "" ? AlertError("Error","Technician Is Required") : PickTicket(true)
            }
          }
          >SUBMIT</button>
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
    <div>
        <LayoutAdmin MenuActive="PendingTicket" Title={"Detail Ticket #" + Id } GroupMenu="HT" Content={
        
        <Content/>
        } />
    </div>
  )
}


export default DetailTicket