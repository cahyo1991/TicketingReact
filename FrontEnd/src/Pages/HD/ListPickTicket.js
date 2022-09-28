import React, { useEffect } from 'react'
import CompListTicket from '../../Component/CompListTicket'
import LayoutAdmin from '../../Component/LayoutAdmin'

function ListPickTicket({hideLoader}) {
    useEffect(() => {
        hideLoader()
        if (!localStorage.getItem("Token")) {
          window.location = "/"      
        } 
        if (localStorage.getItem("IsTicketing") != "1") {
          window.location = "/Modul"      
        }
        document.title = "List Pick Ticket | "  + global.AppName
    }, [])
    
  return (
    <div>
        <LayoutAdmin MenuActive="ListPickTicket" Title="List Pick Ticket" GroupMenu="HT" Content={<CompListTicket Type="GetListPickTicket"/>}/>
    </div>
  )
}

export default ListPickTicket