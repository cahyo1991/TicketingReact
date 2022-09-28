import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetTicket } from '../../Actions/TicketingAction';
import LayoutAdmin from '../../Component/LayoutAdmin'
import LoadingBar from '../../Component/LoadingBar';
import ErrorBar from '../../Component/ErrorBar';
import CompListTicket from '../../Component/CompListTicket';
var XLSX = require("xlsx");

function ListTicket({hideLoader}) {
const dispatch = useDispatch();

const {
  ReturnLoadingIT ,
  ReturnStatusIT ,
  ReturnDataIT ,
  ReturnMessageIT 
} = useSelector((state) => state.TicketingReducer)

  useEffect(() => {
    hideLoader()
    document.title = "Pending Ticket | "  + global.AppName
    if (!localStorage.getItem("Token")) {
      window.location = "/"      
    } 
    if (localStorage.getItem("IsTicketing") != "1") {
      window.location = "/Modul"      
    } 

  }, [])




  return (
    <div>
      <LayoutAdmin MenuActive="PendingTicket" Title="List Pending Ticket" GroupMenu="HT" Content={<CompListTicket Type={"PendingTicket"}/>}/>

    </div>
  )
}

export default ListTicket