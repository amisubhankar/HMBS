import HotelService from '../../Service/hotelDetails/HotelService'
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

const service = new HotelService()

export const getHotelDetails = () => async(dispatch) => {
    await service.getAllHotel()
        .then(response => {
            dispatch({
                type: FETCH_HOTEL_DETAILS_SUCESS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: FETCH_HOTEL_DETAILS_FAIL,
                payload: error
            })
        })
}

export const addHotel = (hotel) => async(dispatch) => {
    await service.addHotel(hotel)
        .then(response => {
            dispatch({
                type: ADD_HOTEL_DETAILS_SUCESS,
                payload: hotel
            })
        })
        .catch(error => {
            dispatch({
                type: ADD_HOTEL_DETAILS_FAIL,
                payload: error
            })
        })
}

export const updateHotel = (hotel) => async(dispatch) => {
    await service.updateHotel(hotel)
        .then(response => {
            dispatch({
                type: UPDATE_HOTEL_DETAILS_SUCESS,
                payload: hotel
            })
        })
        .catch(error=>{
            dispatch({
                type: UPDATE_HOTEL_DETAILS_FAIL,
                payload: error
            })
        })
}

export const deleteHotel = (hotelId) => async(dispatch) => {
    await service.deleteHotelById(hotelId)
        .then(response => {
            dispatch({
                type: DELETE_HOTEL_DETAILS_SUCESS,
                payload: hotelId
            })
        })
        .catch(error=>{
            dispatch({
                type: DELETE_HOTEL_DETAILS_FAIL,
                payload: error
            })
        })
}