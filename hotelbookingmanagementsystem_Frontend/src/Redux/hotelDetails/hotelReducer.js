import {
    FETCH_HOTEL_DETAILS_SUCESS,
    FETCH_HOTEL_DETAILS_FAIL,
    ADD_HOTEL_DETAILS_SUCESS,
    ADD_HOTEL_DETAILS_FAIL,
    UPDATE_HOTEL_DETAILS_SUCESS,
    UPDATE_HOTEL_DETAILS_FAIL,
    DELETE_HOTEL_DETAILS_SUCESS,
    DELETE_HOTEL_DETAILS_FAIL
} from './hotelTypes'

const initialState = {
    hotels : [],
    success: false,
    error : ''
}

export const hotelReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_HOTEL_DETAILS_SUCESS:
            return{
                hotels: action.payload,
                error: ''
            }
        case FETCH_HOTEL_DETAILS_FAIL:
            return{
                hotels: [],
                error: action.payload
            }
        case ADD_HOTEL_DETAILS_SUCESS:
            return{
                hotels: [...state.hotels, action.payload],
                success: true,
                error: ''
            }
        case ADD_HOTEL_DETAILS_FAIL:
            return{
                hotels: state.hotels,
                success: false,
                error: action.payload
            }
        case DELETE_HOTEL_DETAILS_SUCESS:
            return{
                hotels: state.hotels.filter( hotel => hotel.hotelId !== action.payload ),
                success: true,
                error: ''
            }
        case DELETE_HOTEL_DETAILS_FAIL:
            return{
                hotels: state.hotels,
                success: false,
                error: action.payload
            }
        case UPDATE_HOTEL_DETAILS_SUCESS:
            let list = state.hotels.filter(hotel => hotel.hotelId !== action.payload.hotelId)
            return{
                hotels: [...list, action.payload],
                error: ''
            }
        case UPDATE_HOTEL_DETAILS_FAIL:
            return{
                hotels: state.hotels,
                error: action.payload
            }
        default:
            return state
    }
}