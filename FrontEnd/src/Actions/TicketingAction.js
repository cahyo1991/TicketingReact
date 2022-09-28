import axios, { Axios } from "axios";
import { useNavigate } from "react-router";
import AlertError from "../Component/AlertError";
import AlertLoading from "../Component/AlertLoading";
import AlertSuccess from "../Component/AlertSuccess";

export const GET_CATEGORIESTICKET = "GET_CATEGORIESTICKET"
export const GET_TICKET = "GET_TICKET"
export const GET_NOTIFICATION = "GET_NOTIFICATION"
export const GET_TECHNICIAN = "GET_TECHNICIAN"



export const GetTechnician = () =>{
    return (dispatch)=>{
        dispatch({
            type : GET_TECHNICIAN,
            payload :{
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })
        axios.get(global.Api+"GetTechnician",{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem("Token")
            }
        }).then(
            res =>{
                if (res.data.Status == "1") {
                    dispatch({
                        type : GET_TECHNICIAN,
                        payload :{
                            Loading : false,
                            Status : true,
                            Data : res.data.Result,
                            Message : false
                        }
                    })

                    // console.log("Data Technician",res.data.Result)
                }else{
                    dispatch({
                        type : GET_TECHNICIAN,
                        payload : {
                            Loading : false,
                            Status : false,
                            Data : false,
                            Message : res.data.Message
                        }
                    })

                    AlertError("Error",res.data.Message)
                }
            }
        ).catch(
            Error =>{
                dispatch({
                    type : GET_TECHNICIAN,
                    payload : {
                        Loading : false,
                        Status : false,
                        Data : false,
                        Message : Error.response.data.Message
                    }
                })
                AlertError("Error",Error.response.data.Message)
            }
        )
    }
}

export const GetTicket = (IdTicket="-",Type="PendingTicket") =>{
    return (dispatch)=>{
        dispatch({
            type : GET_TICKET,
            payload :{
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })
        // var Url = IdTicket == "-" ?  "GetTicket" : "GetTicketDetail";
        // var Datax = IdTicket == "-" ? JSON.stringify({IsHelpdesk:localStorage.getItem('IsHelpdesk'),CreatedByFT:localStorage.getItem('NIK')}) :     
        // JSON.stringify({Id : IdTicket});
        var Url = IdTicket!="-" ? "GetTicketDetail" : Type == "PendingTicket" ? "GetTicket" :
                   Type == "GetListPickTicket" ?  "GetListPickTicket" : Type == "GetHistoryAssigmentTicket" ? "GetHistoryAssigmentTicket" : "";
        var Datax = IdTicket!="-" ? JSON.stringify({Id : IdTicket}) : Type == "PendingTicket" ?
        JSON.stringify({IsHelpdesk:localStorage.getItem('IsHelpdesk'),CreatedByFT:localStorage.getItem('NIK')}) : 
                     Type == "GetListPickTicket" ? JSON.stringify({NikTechnician : localStorage.getItem('NIK') }) : 
                      Type == "GetHistoryAssigmentTicket" ? JSON.stringify({BijiKadal:""}) : 
                     ""; 
        axios.post(global.Api+Url,Datax
        ,{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem("Token")
            }
        }
        ).then(
            res =>{
                setTimeout(
                    ()=>{
                        if (res.data.Status == "1") {
                            
                            dispatch({
                                type : GET_TICKET,
                                payload : {
                                    Loading : false,
                                    Status : true,
                                    Data : res.data.Result,
                                    Message : res.data.Result.length
                                }
                            }) 
                        } else {
                            dispatch({
                                type : GET_TICKET,
                                payload : {
                                    Loading : false,
                                    Status : false,
                                    Data : false,
                                    Message : res.data.Message
                                }
                            })                    
                        }
                    },1000
                )
            }
        ).catch(
            Error =>{
                dispatch({
                    type : GET_TICKET,
                    payload : {
                        Loading : false,
                        Status : false,
                        Data : false,
                        Message : Error.response.data.Message
                    }
                })
                
            }
        )



    }
}

export const GetNotif = () =>{
    return (dispatch) =>{
        dispatch({
            type : GET_NOTIFICATION,
            payload :{
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })

        

        axios.post(global.Api+"GetNotification",
        JSON.stringify({Code:localStorage.getItem("NIK")}),{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem("Token")
            }
        }
        ).then(
            res =>{
                // console.log(res.data)
                dispatch({
                    type : GET_NOTIFICATION,
                    payload :{
                        Loading : false,
                        Status : true,
                        Data : res.data,
                        Message : "Success"
                    }
                })
            }
        ).catch(
            Error =>{


                dispatch({
                    type : GET_NOTIFICATION,
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
                    else{
                        AlertError("Error",Error.response.data.Message)

                    }

                }
            }
        )

    }
}

export const GetCategoryTicket=()=>{
    return (dispatch)=>{
        dispatch({
            type : GET_CATEGORIESTICKET,
            payload : {
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })

        axios.get(global.Api+"GetTicketCategories",{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem("Token")
            }
        }).then(
            res =>{
                // console.log("Data Category",res.data.Result[0])
                var resultData = [];
                var obj = res.data.Result[0];

                for (let index = 0; index < obj.length; index++) {
                    var objs = {};
                    var value = 'value';
                    var label = 'label';
                    var v_value = obj[index].Id;
                    var v_label = obj[index].CategoryName;
                    objs[value]= v_value;
                    objs[label] = v_label;
                    resultData.push(objs)
                    
                }
                // console.log("obj",resultData)
                dispatch({  
                    type : GET_CATEGORIESTICKET,
                    payload : {
                        Loading : false,
                        Status : true,
                        Data : resultData,
                        Message : "Success Get Data"
                    }
                })
            }
        ).catch(
            Error =>{
                dispatch({
                    type : GET_CATEGORIESTICKET,
                    payload : {
                        Loading : false,
                        Status : false,
                        Data : false,
                        Message : Error.response.data.Message
                    }
                })
                AlertError("Error",Error.response.data.Message)
            }
        )

    }
}