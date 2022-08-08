import {
    ADD_USER_REQUEST,
    DELETE_USER_REQUEST,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    UPDATE_USER_REQUEST,
    ADD_USER_REQUEST_FAILURE,
    UPDATE_USER_REQUEST_FAILURE,
    DELETE_USER_REQUEST_FAILURE,


} from './userType';

const initialState = {
    loading: false,
    user: [],

    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USER_REQUEST:
            return {
                ...state,
                user: [...state.user, action.payload],
                loading: true,
            };

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,//emp data
                loading: false
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ADD_USER_REQUEST:
            return {
                ...state,
                user: [...state.user, action.payload],
            }

        case UPDATE_USER_REQUEST:
            let item = state.user.filter(e => e.userId !== action.payload.userId);
            return {
                ...state, user: [...item, action.payload]
            }

        case DELETE_USER_REQUEST:
            return {
                ...state, user: state.user.filter(e => e.userId !== action.payload)
            }

        case ADD_USER_REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case UPDATE_USER_REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };


        case DELETE_USER_REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
};
