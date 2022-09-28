import React, { useEffect, useLayoutEffect, useState } from 'react'
import LayoutAdmin from '../../Component/LayoutAdmin'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategoryTicket,InsertTicket } from '../../Actions/TicketingAction';
import { useNavigate } from 'react-router';
import AlertError from '../../Component/AlertError';
import AlertLoading from '../../Component/AlertLoading';
import axios from 'axios';
import AlertSuccess from '../../Component/AlertSuccess';
import LoadingBar from '../../Component/LoadingBar'
function RequestTicket({hideLoader}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        
      hideLoader()
      document.title = "Request Ticket | "  + global.AppName
      if (!localStorage.getItem("Token")) {
        window.location = "/"      
      } 
      if (localStorage.getItem("IsTicketing") != "1") {
        window.location = "/Modul"      
      }
      dispatch(GetCategoryTicket())
    }, [])

    const {
        ReturnStatusCT ,
        ReturnDataCT ,
    } = useSelector((state) => state.TicketingReducer)
    const Content = () =>{
        const [AttachmentFT, setAttachmentFT] = useState('');
        const [SubjectFT, setSubjectFT] = useState('');
        const [DescriptionFT, setDescriptionFT] = useState('');
        const [IdCategoryFT, setIdCategoryFT] = useState('');
        const [LabelCat, setLabelCat] = useState('')
        const [showSubmit, setshowSubmit] = useState(true)
        const handleChangeSelect = (selectedOption,action) => {
            setIdCategoryFT(selectedOption.value)
            setLabelCat(selectedOption.label)
          };
    
        const SelectCategory =  () =>{
            return (                
                <Select 
                onChange={handleChangeSelect}
    value = {
        ReturnDataCT.filter(option => 
           option.label === LabelCat)
     }
                options={ReturnDataCT}
                isOptionSelected={true}
                placeholder="Choose Category" />    
            )
        }

        const SubmitEvent = (e) =>{
            e.preventDefault();
            if (IdCategoryFT!="") {
                setshowSubmit(false)
                const fd = new FormData();
                fd.append("image",AttachmentFT);
                fd.append("IdCategoryFT",IdCategoryFT);
                fd.append("SubjectFT",SubjectFT)
                fd.append("DescriptionFT",DescriptionFT)
                fd.append("CreatedByFT",localStorage.getItem('NIK'))
                AlertLoading()
                // console.log("fd",DescriptionFT)
        axios.post(global.Api+"InsertTicket",fd,{
            headers:{
                'x-auth-token' : localStorage.getItem("Token")
            }
        }).then(
            res =>{
                setTimeout(
                    ()=>{
                        if (res.data.Status == "1") {
                            AlertSuccess("Ok","Ticket Is Submitted !")
                            setTimeout(
                                ()=>
                                {
                                    navigate('/ListTicket')
                                },1000
                            )     
                        } else {
                            AlertError("Error",res.data.Message)
                            setshowSubmit(true)
                        }    
                    },2000
                )
            }
        ).catch(
            Error =>{
                if (Error.response.data.Message) {
                    if (Error.response.data.Message == "jwt expired") {
                        AlertError("Login Expired",Error.response.data.Message)
                        localStorage.clear();
                        setTimeout(()=>{
                            localStorage.clear();
                            window.location = "/"
    
                        },1000)                        
                    }
                    else{
                        AlertError("Error",Error.response.data.Message)
                        console.log("Error Cek",Error)
                        setshowSubmit(true)
                    }
                }
            }
        )
            } else {
                AlertError("Form Not Complete","Category Is Required !")
            }
        }
        return(
            <div>
                <form onSubmit={SubmitEvent}>
                    <div className='row'>
                    
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <label>Division</label>
                        <input className='form-control' type={"text"}
                        value={localStorage.getItem('Division')}
                        disabled
                        />
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <label>Category</label>
                        {
                            ReturnStatusCT ?
                            <SelectCategory
                            /> : ""
                        }

                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <label>Attachment  </label>
                        <input className='form-control' type={"file"} 
                        onChange={
                            (e) => setAttachmentFT(e.target.files[0])
                        }                        
                        />
                    </div>
                    </div>
                    <div className='row'>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                    <label>Subject </label>
                    <input
                    value={SubjectFT}
                                            onChange={(res)=>setSubjectFT(res.target.value)}
                                            type="text" 
                                            className="form-control"

                                                 required/>
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                    <label>Description</label>

                        <textarea className='form-control' rows={5}
                        value={DescriptionFT}
                        onChange={
                            (res) => setDescriptionFT(res.target.value)
                        } required
                        >

                            </textarea>
                    </div>

                    </div>

                      <div className='row' style={{marginTop:50}}>
                        
                        <div className=" col-sm-4 col-md-4 col-lg-4">
                            
                        </div>
                        <div className=" col-sm-4 col-md-4 col-lg-4">
                            {
                                showSubmit ?
                                <button className='btn btn-primary form-control' type='submit'>SUBMIT</button> 
                                : <LoadingBar/>
                            }
                            
                            </div>
                            <div className=" col-sm-4 col-md-4 col-lg-4">
                            
                            </div>
                        
                        </div>  

                </form>
            </div>
        )
    }


  return (
    <div>
        <LayoutAdmin MenuActive="PendingTicket" Title="Request Ticket" GroupMenu="HT" Content={<Content/>}/>
    </div>
  )
}

export default RequestTicket