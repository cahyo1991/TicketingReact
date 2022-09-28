import { LOGIN_USER,GET_PROFILE } from "../Actions/LoginAction";

const initialState = {
    ReturnLoadingLoginUser : false,
    ReturnStatusLoginUser : false,
    ReturnDataLoginUser : false,
    ReturnMessageLoginUser : false,

    ReturnLoadingDetailUser : false,
    ReturnStatusDetailUser : false,
    ReturnDataDetailUser : false,
    ReturnMessageDetailUser : false,
}

const LoginReducer = (state =  initialState,action) =>{
    switch (action.type) {
        case LOGIN_USER:
            return {
                ... state,
                ReturnLoadingLoginUser : action.payload.Loading,
                ReturnStatusLoginUser : action.payload.Status,
                ReturnDataLoginUser : action.payload.Data,
                ReturnMessageLoginUser : action.payload.Message
            }

            case GET_PROFILE:
            return {
                ... state,
                ReturnLoadingDetailUser : action.payload.Loading,
                ReturnStatusDetailUser : action.payload.Status,
                ReturnDataDetailUser : action.payload.Data,
                ReturnMessageDetailUser : action.payload.Message
            }
    
        default:
            return state
    }
}

export default  LoginReducer;