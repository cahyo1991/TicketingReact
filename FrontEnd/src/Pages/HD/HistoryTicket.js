import React, { useEffect } from 'react'
import CompListTicket from '../../Component/CompListTicket'
import LayoutAdmin from '../../Component/LayoutAdmin'

function HistoryTicket({hideLoader}) {
    useEffect(() => {
        hideLoader()
        document.title = "History Ticket | "  + global.AppName
        if (!localStorage.getItem("Token")) {
          window.location = "/"      
        } 
        if (localStorage.getItem("IsTicketing") != "1") {
          window.location = "/Modul"      
        }
    }, [])
    
  return (
    <div>
    <LayoutAdmin Title="History Assigment Ticket" MenuActive="HistoryAssigmentTicket" GroupMenu="HT" 
    Content={<CompListTicket Type={"GetHistoryAssigmentTicket"}/>} 
    />


    </div>
  )
}

export default HistoryTicket