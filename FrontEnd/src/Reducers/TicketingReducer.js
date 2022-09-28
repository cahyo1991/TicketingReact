import{GET_CATEGORIESTICKET,GET_TICKET,GET_NOTIFICATION,GET_TECHNICIAN} from '../Actions/TicketingAction'

const initialState = {
    ReturnLoadingCT : false,
    ReturnStatusCT : false,
    ReturnDataCT : false,
    ReturnMessageCT : false,

    ReturnLoadingIT : false,
    ReturnStatusIT : false,
    ReturnDataIT : false,
    ReturnMessageIT : false,


    ReturnLoadingNT : false,
    ReturnStatusNT : false,
    ReturnDataNT : false,
    ReturnMessageNT : false,

    ReturnLoadingASS : false,
    ReturnStatusASS : false,
    ReturnDataASS : false,
    ReturnMessageASS : false

}



const TicketingReducer = (state =  initialState,action) =>{

    switch (action.type) {
        case GET_CATEGORIESTICKET:
            return {
                ... state,
                ReturnLoadingCT : action.payload.Loading,
                ReturnStatusCT : action.payload.Status,
                ReturnDataCT : action.payload.Data,
                ReturnMessageCT : action.payload.Message
            }

            case GET_TICKET:
                return {
                    ... state,
                    ReturnLoadingIT : action.payload.Loading,
                    ReturnStatusIT : action.payload.Status,
                    ReturnDataIT : action.payload.Data,
                    ReturnMessageIT : action.payload.Message
                }

                case GET_NOTIFICATION:
                    return {
                        ... state,
                        ReturnLoadingNT : action.payload.Loading,
                        ReturnStatusNT : action.payload.Status,
                        ReturnDataNT : action.payload.Data,
                        ReturnMessageNT : action.payload.Message
                    }

                    case GET_TECHNICIAN:
                        return {
                            ... state,
                            ReturnLoadingASS : action.payload.Loading,
                            ReturnStatusASS : action.payload.Status,
                            ReturnDataASS : action.payload.Data,
                            ReturnMessageASS : action.payload.Message
                        }
    
        default:
            return state
            
    }


}

export default  TicketingReducer;