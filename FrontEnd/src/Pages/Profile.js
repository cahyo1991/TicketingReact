import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../Component/LayoutAdmin'
import LoadingBar from '../Component/LoadingBar'
import ErrorBar from '../Component/ErrorBar'
import { GetProfile } from '../Actions/LoginAction';

function Profile({hideLoader}) {

    const dispatch = useDispatch();
    const {
        ReturnLoadingDetailUser ,
        ReturnStatusDetailUser ,
        ReturnDataDetailUser ,
        ReturnMessageDetailUser ,
    }= useSelector((state) => state.LoginReducer)

    const [DataProfile, setDataProfile] = useState("0")
    useEffect(() => {
        hideLoader()
        document.title = "Profile | "  + global.AppName
        if (!localStorage.getItem("Token")) {
          window.location = "/"      
        } 
        dispatch(GetProfile())
      }, [])


      
    
      const DetailProfile  =   ({data}) =>{
        return (
            <div className='table-responsive'>
                {/* {
                    data.map((item,index)=>(
                        <b key={index}>{item.FullName}</b>        
                    ))
                }
                <b>{data[0].FullName}</b> */}
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr >
                            <td>Nik</td>
                            <td>:</td>
                            <td>{data[0].NIP}</td>
                        </tr>
                        <tr >
                            <td>FullName</td>
                            <td>:</td>
                            <td>{data[0].FullName}</td>
                        </tr>
                        <tr >
                            <td>Sex</td>
                            <td>:</td>
                            <td>{data[0].Sex}</td>
                        </tr>
                        <tr >
                            <td>Email</td>
                            <td>:</td>
                            <td>{data[0].Email}</td>
                        </tr>
                        <tr >
                            <td>Work Area</td>
                            <td>:</td>
                            <td>{data[0].HOBranch}</td>
                        </tr>
                        <tr>
                            <td>Division</td>
                            <td>:</td>
                            <td>{data[0].CodeDivision}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>:</td>
                            <td>{data[0].CodeDivision}</td>
                        </tr>
                        </tbody>
                </table>
                
            </div>
        )
      }


      const Content = () =>{
        return(
            <div className='container'>
{
    ReturnLoadingDetailUser ?
    <LoadingBar/>
    : ReturnStatusDetailUser ? 
    <DetailProfile data={ReturnDataDetailUser}/> : <ErrorBar message={ReturnMessageDetailUser}/>
}
            </div>
        )
      }

  return (
    <LayoutAdmin Title="Detail Profile" GroupMenu="Modul" Content={<Content/>}/>
    
  )
}

export default Profile