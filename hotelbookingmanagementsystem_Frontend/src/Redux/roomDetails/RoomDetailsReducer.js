import {
    ALL_ROOM_DETAILS_REQUEST, ALL_ROOM_DETAILS_SUCCESS, ALL_ROOM_DETAILS_FAILURE,
    ROOM_DETAILS_ADD_REQUEST, ROOM_DETAILS_ADD_SUCCESS, ROOM_DETAILS_ADD_FAILURE,
    ROOM_DETAILS_ADD_RESET, ROOM_DETAILS_UPDATE_REQUEST, ROOM_DETAILS_UPDATE_SUCCESS, ROOM_DETAILS_UPDATE_FAILURE,
    ROOM_DETAILS_UPDATE_RESET,
    ROOM_DETAILS_DELETE_REQUEST, ROOM_DETAILS_DELETE_SUCCESS, ROOM_DETAILS_DELETE_FAILURE,
    ROOM_DETAILS_DELETE_RESET,
    ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS, ROOM_DETAILS_FAILURE
} from './RoomDetailsTypes'

const initialState = {
    loading: true,
    rooms: [],
    error: '',
    success: false,
    addRoom: {},
    updateRoom: {},
}

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_ROOM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                rooms: []
            }

        case ALL_ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload,
                error: ''
            }

        case ALL_ROOM_DETAILS_FAILURE:
            return {
                // ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const addRoomDetailsReducer = (state = initialState, action) => {
    switch (action.type) {

        case ROOM_DETAILS_ADD_REQUEST:
            return {
                ...state,
                loading: true
            };

        case ROOM_DETAILS_ADD_SUCCESS:
            return {
                loading: false,
                addRoom: action.payload,
                success: true,
            }

        case ROOM_DETAILS_ADD_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload
            }
        case ROOM_DETAILS_ADD_RESET:
            return {
                ...state,
                success: false
            }

        default:
            return state;
    }
}


export const updateRoomDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_DETAILS_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ROOM_DETAILS_UPDATE_SUCCESS:
            return {
                loading: false,
                updateRoom: action.payload,
                success: true,
            }
        case ROOM_DETAILS_UPDATE_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload
            }
        case ROOM_DETAILS_UPDATE_RESET:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const deleteRoomDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_DETAILS_DELETE_REQUEST:
            return {
                loading: true
            }

        case ROOM_DETAILS_DELETE_SUCCESS:
            return {
                loading: false,
                updateRoom: action.payload,
                success: true,
            }

        case ROOM_DETAILS_DELETE_FAILURE:
            return {
                laoding: false,
                success: false,
                error: action.payload
            }

        case ROOM_DETAILS_DELETE_RESET:
            return {
                success: false,
            }

        default:
            return state;
    }
}


export const room = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return {
                // ...state,
                loading: true,

            }

        case ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload,
                error: ''
            }

        case ROOM_DETAILS_FAILURE:
            return {
                // ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}
export const roomByHotelId = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                rooms: []
            }

        case ROOM_DETAILS_SUCCESS:
            return {
                loading: false,
                rooms: action.payload,
                error: ''
            }

        case ROOM_DETAILS_FAILURE:
            return {
                // ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}

