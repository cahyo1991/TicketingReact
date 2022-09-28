import axios from "axios";
import AlertLoading from "../Component/AlertLoading";
import AlertSuccess from "../Component/AlertSuccess";
import AlertError from "../Component/AlertError";



export const LOGIN_USER = "LOGIN_USER";

export const GET_PROFILE = "GET_PROFILE"; 



export const LogOut = () =>{
    return (dispatch) =>{
        localStorage.clear();
        AlertLoading()
        setTimeout(()=>{
            localStorage.clear();
            window.location = "/"

        },1000)   
    }
}


export const GetProfile = (Code) =>{
    return (dispatch) =>{
        dispatch({
            type : GET_PROFILE,
            payload : {
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })

        const Datax = JSON.stringify({Code:localStorage.getItem("NIK")});
        // console.log(Datax)
        axios.post(global.Api+"GetProfile",Datax,{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem("Token")
            }  
        }).then(
            res =>{
                setTimeout(
                    ()=>{

                        console.log("data",res.data.Result[0][0])

                        dispatch({
                            type : GET_PROFILE,
                            payload : {
                                Loading : false,
                                Status : true,
                                Data : res.data.Result[0],
                                Message : "Success Get Data"
                            }
                        })
                    },1200
                )
              
                // console.log("Token",localStorage.getItem("Token"))

            }
        ).catch(
            Error =>{


                dispatch({
                    type : GET_PROFILE,
                    payload : {
                        Loading : false,
                        Status : false,
                        Data : false,
                        Message : Error.response.data.Message
                    }
                })

                if (Error.response.data.Message) {
                    if (Error.response.data.Message == "jwt expired") {
                        AlertError("Login Expired",Error.response.data.Message)
                        localStorage.clear();
                        setTimeout(()=>{
                            localStorage.clear();
                            window.location = "/"
    
                        },1000)                        
                    }

                }

                // console.log(error.message)
        
            }
        )
    }
}


export const LoginUser =(Username,Password) =>{
    return (dispatch) => {
        window.localStorage.clear();
        AlertLoading()
        // AlertSuccess("Title","Message")      
        
        // console.log("1. First Login Action")
        dispatch({
            type : LOGIN_USER,
            payload : {
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })


    const Datax = JSON.stringify({Username : Username,Password:Password});

    // console.log("Username" + Username  + " Pass"  + Password)

      axios.post(global.Api+"Login",Datax, {
        headers: {
            'Content-Type': 'application/json',
        }}).then(
        Response => {
            console.log("Response",Response)

            setTimeout(()=>{
                if (Response.data.Status == "1") {
                    
                    localStorage.setItem("NIK",Response.data.Result[0][0].NIK)
                    localStorage.setItem("IsAsset",Response.data.Result[0][0].IsAsset ? Response.data.Result[0][0].IsAsset : "0")
                    localStorage.setItem("IsHelpdesk",Response.data.Result[0][0].IsHelpdesk ? Response.data.Result[0][0].IsHelpdesk : "0")
                    localStorage.setItem("IsTicketing",Response.data.Result[0][0].IsTicketing ? Response.data.Result[0][0].IsTicketing : "0")
                    localStorage.setItem("IsTechnician",Response.data.Result[0][0].IsTechnician ? Response.data.Result[0][0].IsTechnician : "0")
                    localStorage.setItem("FullName",Response.data.Result[0][0].FullName)
                    localStorage.setItem("Token",Response.data.Token)
                    localStorage.setItem("Division",Response.data.Result[0][0].CodeDivision)
                    AlertSuccess("Ok","Success Login")
                        // history.push('/fdsfdfs')
                    dispatch({
                        type : LOGIN_USER,
                        payload : {
                            Loading : false,
                            Status : true,
                            Data : Response.data.Result,
                            Message : Response.data.Message
                        }
                        
                    })
                    window.location= '/Modul'
                } else {
                    
                    // console.log("3. Result",Response.data.Status)
                    
    AlertError("Oops",Response.data.Message)
                    dispatch({
                        type : LOGIN_USER,
                        payload : {
                            Loading : false,
                            Status : false,
                            Data : false,
                            Message : Response.data.Message
                        }
                    })
                }
            },3000)

        }
      ).catch(
        error => {
            // console.log("3. Result",error.message)
            AlertError("Oops",error.message)
                  dispatch({
                    type : LOGIN_USER,
                    payload : {
                        Loading : false,
                        Status : false,
                        Data : false,
                        Message : error.message
                    }
                })
        }
    )

    }
}