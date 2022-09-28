import axios from "axios";

export const GET_DEPARTMENT = "GET_DEPARTMENT";
export const GET_VACANCIES = "GET_VACANCIES";


export const GetVacancies = (Token,Email,FilterDepartment,FilterName,Offset) =>{

    return (dispatch) =>{
        dispatch({
            type : GET_VACANCIES,
            payload : {
                Loading : true,
                Status : false,
                Data : false,
                Message : false
            }
        })


        console.log("url =" +global.Api + "GetVacancies?Email&FilterDepartment=" + FilterDepartment +"&FilterName=" + FilterName + "&Fooset=" + Offset)
        axios.get(global.Api + "GetVacancies?Email&FilterDepartment=" + FilterDepartment +"&FilterName=" + FilterName + "&Offset=" + Offset,{
            headers : {
                'Token' : Token,
                'Access-Control-Allow-Credentials' : 'true'
            },
            timeout : 120000  
        }).then(
            response => {

                if (response.data.Return.length > 0) {

                    console.log("Berhasil Ngambil Data GetVacancies",response.data);
setTimeout(() => {
    dispatch({
        type : GET_VACANCIES,
        payload : {
            Loading : false,
            Status : true,
            Data : response.data,
            Message : "Success"
        }
    })    
}, 1500);

                }else{

                    setTimeout(() => {
                        dispatch({
                            type : GET_VACANCIES,
                            payload : {
                                Loading : false,
                                Status : false,
                                Data : false,
                                Message : "Empty Data"
                            }
                        })
                    }, 1500);

        
                }

            }
        ).catch(
            error => {
                    //   console.log("ERROR GET_DEPARTMENT",error);
            dispatch({
                type : GET_VACANCIES,
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


export const GetDepartment = (Token,Email) =>{

    return (dispatch) =>{
        dispatch({
            type : GET_DEPARTMENT,
            payload : {
               Loading : true,
               Status : false,
               Data : false,
               Message : false

            }
        })


        axios.get( global.Api + 'GetDepartment?Email', {
            headers: {
              'Token': Token,
              'Access-Control-Allow-Credentials' : 'true'
            },
            timeout : 120000    
        }).then(
            response => {
                     console.log("Berhasil Ngambil Data GET_DEPARTMENT",response.data);

            
                     if (response.data.Return.length > 0) {
                        dispatch({
                            type : GET_DEPARTMENT,
                            payload : {
                           Loading : false,
                           Status : true,
                           Data : response.data,
                           Message : "Success"
                            }
                        })
                     }else{
                        dispatch({
                            type : GET_DEPARTMENT,
                            payload : {
                           Loading : false,
                           Status : false,
                           Data : false,
                           Message : "Empty Data"
                            }
                        })
                     }




            }
        ).catch(
            error => {
                      console.log("ERROR GET_DEPARTMENT",error);
            dispatch({
                type : GET_DEPARTMENT,
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