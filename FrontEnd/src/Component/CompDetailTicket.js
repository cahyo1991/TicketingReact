import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTicket } from '../Actions/TicketingAction'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'

function CompDetailTicket(props) {
const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(GetTicket(props.Id))
  }, [])

  const {
    ReturnLoadingIT ,
    ReturnStatusIT ,
    ReturnDataIT ,
    ReturnMessageIT ,
  } = useSelector((state) => state.TicketingReducer)
  return (
    
    ReturnLoadingIT ? <LoadingBar/> :
    ReturnStatusIT != true ? <ErrorBar message={ReturnMessageIT}/> :
    <div>
    <div className='row'>
        
        <div className="col-sm-4 col-md-4 col-lg-4">
            <label>Requestor  </label>
            <input className='form-control' disabled value={ReturnDataIT[0].Requestor}/>

        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
            <label>Email Requestor</label>
            <input className='form-control' disabled value={ReturnDataIT[0].EmailRequestor}/>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
            <label>Division Requestor</label>
            <input className='form-control' disabled value={ReturnDataIT[0].DivisionRequestor}/>
        </div>
        
    </div>
    <div className='row'>
        
        <div className="col-sm-4 col-md-4 col-lg-4">
            <label>Subject</label>
            <input className='form-control' disabled value={ReturnDataIT[0].Subject}/>
            <label>Category</label>
            <input className='form-control' disabled value={ReturnDataIT[0].CategoryName}/>
        </div>
        
        <div className="col-sm-4 col-md-4 col-lg-4">
            <label>Description</label>
            <textarea className='form-control' disabled rows={"5"} value={ReturnDataIT[0].Description}></textarea>    
        </div>


            <div className="col-sm-4 col-md-4 col-lg-4">
                <label>Attachment  </label>    
                <br/>
                {
                    ReturnDataIT[0].Attachment == "-" ? "No Image"
                    :<a target={"_blank"} href={global.ApiImage+ReturnDataIT[0].Attachment}>Link Image</a>
                }
                
            </div>
        
    </div>
     
     {
      props.IsHitory ? 
      <div className='row'>
        <label>Resolution</label>
        
      </div>
      
      :""
     }           


    </div>
  )
}

export default CompDetailTicket