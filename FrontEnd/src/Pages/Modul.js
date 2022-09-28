import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertError from '../Component/AlertError'
import LayoutAdmin from '../Component/LayoutAdmin'

function Modul({ hideLoader }) {

    useEffect(() => {
      hideLoader()
      document.title = "List Modul | "  + global.AppName
      if (!localStorage.getItem("Token")) {
        window.location = "/"      
      } 
    }, [])

   const Content = () =>{
     return(
<div className='row'>
  
  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
  <div className="card border-left-primary shadow h-100 py-2" style={{background:
    localStorage.getItem('IsTicketing') == "1" ?
    'white':'#bdc3c7'}}>
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Modul</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                              <Link to={"/ListTicket"}>
                                              Helpdesk Ticketing 
                                              </Link>
                                              </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-exclamation-circle fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
      </div>    
  </div>
  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
  <div className="card border-left-primary shadow h-100 py-2"
  style={{
    background: '#bdc3c7'
  }}
  >
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Modul</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                              
                                              IT Device New Hire 
                                              
                                              </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-user fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
      </div>    
  </div>

  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
  <div className="card border-left-primary shadow h-100 py-2"
  style={{background:
    localStorage.getItem('IsAsset') == "1" ?
    'white':'#bdc3c7'}}
  >
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Modul</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                              {
                                                localStorage.getItem('IsAsset') == "1"?
                                                <Link to={"/ListNewHire"}>
                                                Asset
                                                </Link>
                                                :
                                                <p>Asset</p>
                                              }

                                              </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-server fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
      </div>    
  </div>


                            
</div>
    )
   } 
    

  return (
    <div>
      <LayoutAdmin Title="List Modul" GroupMenu="Modul" MenuActive="Modul" Content={<Content/>}/>
    </div>
  )
}

export default Modul