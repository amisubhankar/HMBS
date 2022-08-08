import {
    FETCH_BOOKING_DETAILS_FAIL,
    FETCH_BOOKING_DETAILS_REQUEST,
    FETCH_BOOKING_DETAILS_SUCCESS,
    DELETE_BOOKING_FAILURE,
    DELETE_BOOKING_SUCCESS,
    ADD_BOOKING_DETAILS_FAILURE,
    ADD_BOOKING_DETAILS_SUCCESS,
    UPDATE_BOOKING_DETAILS_FAILURE,
    UPDATE_BOOKING_DETAILS_SUCCESS,
    FETCH_BOOKING_DETAILS_BY_USER_ID_SUCCESS,
    FETCH_BOOKING_DETAILS_BY_USER_ID_FAIL
} from './bookingTypes'

const initialState = {
    loading: false,
    bookings: [],
    error: '',
    bookingAmount: ''
}
export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKING_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                bookings: [],
                bookingAmount: ''
            };
        case FETCH_BOOKING_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload,
            };
        case FETCH_BOOKING_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                bookingAmount: ''
            };
        case DELETE_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.filter(book => book.bookingId !== action.payload),
                bookingAmount: ''
            }
        case DELETE_BOOKING_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case ADD_BOOKING_DETAILS_SUCCESS:
            return {
                ...state,
                bookings: [...state.bookings, action.payload.booking],
                bookingAmount: action.payload.amount
            }
        case ADD_BOOKING_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload,
                bookingAmount: action.payload.amount
            }
        case UPDATE_BOOKING_DETAILS_SUCCESS:
            let list = state.bookings.filter(book => book.bookingId !== action.payload.booking.bookingId)
            return {
                bookings: [...list, action.payload.booking],
                bookingAmount: action.payload.amount
            }
        case UPDATE_BOOKING_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload,
                bookingAmount: action.payload.amount
            }
        case FETCH_BOOKING_DETAILS_BY_USER_ID_SUCCESS:
            return {
                bookings: action.payload,
                error: '',
                bookingAmount: ''
            }
        case FETCH_BOOKING_DETAILS_BY_USER_ID_FAIL:
            return {
                bookings: [],
                error: action.payload,
                bookingAmount: ''
            }
        default:
            return state
    }
} 