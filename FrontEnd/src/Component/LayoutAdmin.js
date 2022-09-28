import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogOut } from '../Actions/LoginAction';
import { GetNotif } from '../Actions/TicketingAction';
// import { GetCategoryTicket,InsertTicket } from '../../Actions/TicketingAction';

function LayoutAdmin(props) {
    const dispatch = useDispatch();
useEffect(() => {
  dispatch(GetNotif())
}, [])

const {
    ReturnLoadingNT ,
    ReturnStatusNT ,
    ReturnDataNT ,
    ReturnMessageNT 
}  = useSelector((state) => state.TicketingReducer)

const MenuActive  =(LabelMenu) =>{
    var variant = 'nav-item '
    if (LabelMenu == props.MenuActive) {
        variant = variant + 'active'
    }
    // variant += ' active';
    console.log()
    return variant
}


  return (
    <div id="wrapper"> 
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-server"></i>
            </div>
            <div className="sidebar-brand-text mx-3">IT Solution
            
             </div>
        </a>

   
        <hr className="sidebar-divider my-0"/>




        
        <hr className="sidebar-divider"/>









        <div className="sidebar-heading">
            Menu
        </div>
        <li className={MenuActive('Modul')}>
    
    <Link to={"/Modul"} className="nav-link" >
        <i className="fas fa-fw fa-book"></i>
        <span>Modul</span></Link>
  </li>
{
  props.GroupMenu == "Modul" ?
  "" : 
props.GroupMenu == "IDNH" ?

<div>
<li className="nav-item ">
    
    <Link to={"/Modul"} className="nav-link" >
        <i className="fas fa-fw fa-book"></i>
        <span>Modul</span></Link>
  </li>
  
<li className="nav-item ">
    
  <Link to={"/ListNewHire"} className="nav-link" >
      <i className="fas fa-fw fa-book"></i>
      <span>List Request</span></Link>
</li>
</div>
:props.GroupMenu == "HT"?
<div>

<div className="sidebar-heading">
            Helpdesk Ticketing
        </div>

<li className={MenuActive('PendingTicket')}>
    
  <Link to={"/ListTicket"} className="nav-link" >
      <i className="fas fa-fw fa-clock"></i>
      <span>Pending Ticket</span></Link>
</li>


<li className="nav-item ">
    
    <Link to={"/HistoryTicket"} className="nav-link" >
        <i className="fas fa-fw fa-calendar-check"></i>
        <span>History Request Ticket </span></Link>
  </li> 





{
    localStorage.getItem('IsHelpdesk') == "1" || localStorage.getItem('IsTechnician') == "1" ?
    <div>
        <div className="sidebar-heading">
            Execution Ticket
        </div>
        <li className={MenuActive('ListPickTicket')}>
    
  <Link to={"/ListPickTicket"} className="nav-link" >
      <i className="fas fa-fw fa-tasks"></i>
      <span>List Pick Ticket</span></Link>
</li>

<li className={MenuActive('HistoryAssigmentTicket')}>
    
    <Link to={"/HistoryTicket"} className="nav-link" >
        <i className="fas fa-fw fa-history"></i>
        <span>History Assigment Ticket</span></Link>
  </li>
        </div>
        :"" 
}

</div> 


:""
}



        <hr className="sidebar-divider d-none d-md-block"/>


        <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

    </ul>
 


    <div id="content-wrapper" className="d-flex flex-column">

     
        <div id="content">

       
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <form className="form-inline">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                </form>

        


       
                <ul className="navbar-nav ml-auto">

         
             

                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw"></i>
          
                            <span className="badge badge-danger badge-counter">{
                                ReturnStatusNT ? ReturnDataNT.TotalNotif : ""
                            }</span>
                        </a>
       
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Notif Center
                            </h6>

                            {
                                ReturnStatusNT ? 
                                ReturnDataNT.Result[0].map((i,index)=>
                                <Link key={index}  to={i.Link}>
                                <span key={index} className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-primary">
                                        <i className="fas fa-file-alt text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">#{i.IdForm} - {i.RequestorName}</div>
                                    
                                    <span className="font-weight-bold">{i.Title}</span>
                                   
                                </div>
                            </span>
                            </Link>
                                ) : ""
                            }
        

              
                            <a className="dropdown-item text-center small text-gray-500" href="#">List Notification</a>
                        </div>
                    </li>


            

                    <div className="topbar-divider d-none d-sm-block"></div>


                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{localStorage.getItem("FullName")}</span>
                            {/* <img className="img-profile rounded-circle"
                                src="img/undraw_profile.svg" /> */}
                        </a>
 
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                                <Link to={"/Profile"} className="dropdown-item">
                            
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            
                            </Link>
             
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" onClick={()=>{ dispatch(LogOut()) }}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>

            <div className="container-fluid">

      
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"> {props.Title} </h6>
                    </div>
                    <div className="card-body">
                    {props.Content}
                    </div>
                </div>

            </div>


        </div>
      

       
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2020</span>
                </div>
            </div>
        </footer>
   

    </div>


</div>
  )
}

export default LayoutAdmin