import {GET_DEPARTMENT,GET_VACANCIES} from '../Actions/JobAction'

const initialState = {
    ReturnLoading : false,
    ReturnStatus : false,
    ReturnData : false,
    ReturnMessage : false,

    ReturnLoadingVacancies : false,
    ReturnStatusVacancies : false,
    ReturnDataVacancies : false,
    ReturnMessageVacancies : false,

}
const JobReducer = (state =  initialState,action) =>{

    switch (action.type) {
        case GET_DEPARTMENT:
            console.log("4. Masuk Reducer", action)
            return {
                ... state,
                ReturnLoading : action.payload.Loading,
                ReturnStatus : action.payload.Status,
                ReturnData : action.payload.Data,
                ReturnMessage : action.payload.Message
            }
         case GET_VACANCIES :
         return {
            ... state,
            ReturnLoadingVacancies : action.payload.Loading,
            ReturnStatusVacancies : action.payload.Status,
            ReturnDataVacancies : action.payload.Data,
            ReturnMessageVacancies : action.payload.Message
        }
        default:
            return state
    }

}

export default  JobReducer;