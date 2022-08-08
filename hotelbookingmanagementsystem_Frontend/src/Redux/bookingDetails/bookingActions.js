import BookingDetailsService from '../../Service/bookingDetails/BookingDetailsService'
import {
    FETCH_BOOKING_DETAILS_FAIL,
    FETCH_BOOKING_DETAILS_REQUEST,
    FETCH_BOOKING_DETAILS_SUCCESS,
    DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_SUCCESS,
    ADD_BOOKING_DETAILS_SUCCESS,
    ADD_BOOKING_DETAILS_FAILURE,
    UPDATE_BOOKING_DETAILS_SUCCESS,
    UPDATE_BOOKING_DETAILS_FAILURE
} from './bookingTypes'

const bookingService = new BookingDetailsService()

export const fetchBookingDetailsRequest = () => {
    return {
        type: FETCH_BOOKING_DETAILS_REQUEST
    }
}

export const fetchBookingDetailsSuccess = (bookings) => {
    return {
        type: FETCH_BOOKING_DETAILS_SUCCESS,
        payload: bookings
    }
}

export const fetchBookingDetailsFailure = (error) => {
    return {
        type: FETCH_BOOKING_DETAILS_FAIL,
        payload: error
    }
}

export const addBookingDetailsSuccess = (booking, amount) => {
    return {
        type: ADD_BOOKING_DETAILS_SUCCESS,
        payload: { booking: booking, amount: amount }
    }
}

export const addBookingDetailsFailure = (error) => {
    return {
        type: ADD_BOOKING_DETAILS_FAILURE,
        payload: error
    }
}

export const deleteBookingDetailsSuccess = (bookingId) => {
    return {
        type: DELETE_BOOKING_SUCCESS,
        payload: bookingId
    }
}

export const deleteBookingDetailsFailure = (error) => {
    return {
        type: DELETE_BOOKING_FAILURE,
        payload: error
    }
}

export const updateBookingDetailsSuccess = (booking, amount) => {
    return {
        type: UPDATE_BOOKING_DETAILS_SUCCESS,
        payload: { booking: booking, amount: amount }
    }
}

export const updateBookingDetailsFailure = (error) => {
    return {
        type: UPDATE_BOOKING_DETAILS_FAILURE,
        payload: error
    }
}

export const getBookingDetails = () => async (dispatch) => {

    //console.log('Inside getBookingDetails()')
    dispatch(fetchBookingDetailsRequest())
    await bookingService.getAllBookingDetails()
        .then(response => {
            dispatch(fetchBookingDetailsSuccess(response.data))
        })
        .catch(error => {
            dispatch(fetchBookingDetailsFailure(error.response.data.message))
        })
}

export const deleteBookingDetails = (bookingId) => async (dispatch) => {

    await bookingService.deleteBookingDetailById(bookingId)
        .then(response => {
            dispatch(deleteBookingDetailsSuccess(response.data))
        })
        .catch(error => {
            dispatch(deleteBookingDetailsFailure(error.response.data.message))
        })
}

export const addBookingDetails = (booking) => async (dispatch) => {

    //console.log('Inside addBookingDetails()')
    await bookingService.addBookingDetails(booking)
        .then(response => {
            dispatch(addBookingDetailsSuccess(booking, response.data))
        })
        .catch(error => {
            dispatch(addBookingDetailsFailure(error.response.data.message))
        })
}

export const updateBookingDetails = (booking) => async (dispatch) => {

    console.log('Inside updateBookingDetails()')
    await bookingService.updateBookingDetails(booking)
        .then(response => {
            dispatch(updateBookingDetailsSuccess(booking,response.data))
        })
        .catch(error => {
            dispatch(updateBookingDetailsFailure(error.response.data.message))
        })
}