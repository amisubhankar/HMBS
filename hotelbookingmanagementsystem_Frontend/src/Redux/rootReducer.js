import { combineReducers } from "redux";
import { loginReducer } from './login/loginReducer'
import { bookingReducer } from "./bookingDetails/bookingReducer";
import { hotelReducer } from "./hotelDetails/hotelReducer";
import { userReducer } from "./userDetails/userReducer";
import { roomReducer, addRoomDetailsReducer, updateRoomDetailsReducer, deleteRoomDetailsReducer, room, roomByHotelId } from "./roomDetails/RoomDetailsReducer";

const rootReducer = combineReducers({
    loginR: loginReducer,
    bookingR: bookingReducer,
    hotelR: hotelReducer,
    userR: userReducer,
    roomReducer, addRoomDetailsReducer, updateRoomDetailsReducer, deleteRoomDetailsReducer, room, roomByHotelId
})

export default rootReducer