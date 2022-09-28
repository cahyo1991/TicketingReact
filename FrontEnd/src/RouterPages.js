import { 
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import React from 'react'

import Login from './Pages/Login'
import Modul from './Pages/Modul';
import ListNewHire from './Pages/ID/ListNewHire';
import Profile from './Pages/Profile';
import ListTicket from './Pages/HD/ListTicket';
import RequestTicket from './Pages/HD/RequestTicket';
import DetailTicket from './Pages/HD/DetailTicket';
import ListPickTicket from './Pages/HD/ListPickTicket';
import DetailPickTicket from './Pages/HD/DetailPickTicket';
import HistoryTicket from './Pages/HD/HistoryTicket';




function RouterPages({hideLoader}) {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login hideLoader={hideLoader}/>}/>
            <Route path='/Modul' element={<Modul hideLoader={hideLoader}/>}/>
            <Route path='/ListNewHire' element={<ListNewHire hideLoader={hideLoader}/>}/>
            <Route path='/Profile' element={<Profile hideLoader={hideLoader}/>}/>
            <Route path='/ListTicket' element={<ListTicket hideLoader={hideLoader}/>}/>
            <Route path='/ListTicket/:Id' element={<DetailTicket hideLoader={hideLoader}/>}/>
            <Route path='/RequestTicket' element={<RequestTicket hideLoader={hideLoader}/>}/>
            <Route path='/ListPickTicket' element={<ListPickTicket hideLoader={hideLoader}/>}/>
            <Route path='/ListPickTicket/:Id' element={<DetailPickTicket hideLoader={hideLoader}/>}/>
            <Route path='/HistoryTicket' element={<HistoryTicket hideLoader={hideLoader}/>}/>
            
            
        </Routes>
    </Router>
  )
}

export default RouterPages