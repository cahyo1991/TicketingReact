import { combineReducers } from "redux";
import JobReducer from "./JobReducer";
import LoginReducer from "./LoginReducer"
import TicketingReducer from './TicketingReducer'
export default combineReducers({
    //nanti diisi reducernya disini
    JobReducer,
    LoginReducer,
    TicketingReducer
})