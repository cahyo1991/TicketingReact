import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../Actions/LoginAction';
import { Button, Card, Grid, TextField } from '@mui/material';
// import 'bootstrap/jqueryboostrap'
// import 'bootstrap/bootstrap'


function Login({ hideLoader }) {

  const {
    ReturnLoadingLoginUser ,
    ReturnStatusLoginUser ,
    ReturnDataLoginUser ,
    ReturnMessageLoginUser ,
  } = useSelector((state) => state.LoginReducer)

  const dispatch = useDispatch();
useEffect(() => {
  document.title = "Login Page | "  + global.AppName
  // document.body.style.background ="#95a5a6"
  hideLoader();
  if (localStorage.getItem("Token")) {
    window.location = "/Modul"      
  } 

  

  

}, [])


const [Username, setUsername] = useState('');
const [Password, setPassword] = useState('');
const [StatusLogin, setStatusLogin] = useState(ReturnStatusLoginUser)



const HandleSubmitLogin = async (e) =>{
  e.preventDefault();
  dispatch(LoginUser(Username,Password))


}

  return (
    <div className="container">


     <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">

                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image-depan"
                            style={{
                              backgroundImage:`url(https://images.squarespace-cdn.com/content/v1/602fb923fb2e6c2319e248e3/1629821550274-P4F12BNZ2JG5J6SLOJ0J/Etana_facade.jpg?format=750w)`,
                            }}
                            ></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">IT Management Apps</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input
                                            onChange={(res) => setUsername(res.target.value) }
                                            value={Username}
                                            type="text" className="form-control form-control-user"
                                                id="exampleInputEmail" 
                                                placeholder="NIP" required/>
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            value={Password}
                                            onChange={(res) => setPassword(res.target.value)}
                                            type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" required/>
                                        </div>

                                        <button onClick={HandleSubmitLogin} className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                        

                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div> 

    </div>
  )
}

export default Login