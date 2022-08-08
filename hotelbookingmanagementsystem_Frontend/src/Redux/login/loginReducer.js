import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGOUT_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT_SUCCESS,
    RESET
} from './loginTypes'

const initialState = {
    id: '',
    name: '',
    isLoggedIn: false,
    role: '',
    error: ''
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_SUCCESS:
            return {
                id: '',
                name: 'Admin',
                isLoggedIn: true,
                role: 'admin',
                error: ''
            }
        case ADMIN_LOGIN_FAILURE:
            return {
                error: action.payload,
                isLoggedIn: false,
                role: ''
            }
        case USER_LOGIN_SUCCESS:
            return {
                id: action.payload.id,
                name: action.payload.name,
                isLoggedIn: true,
                role: 'user',
                error: ''
            }
        case USER_LOGIN_FAILURE:
            return {
                error: action.payload,
                role: '',
                isLoggedIn: false
            }
        case ADMIN_LOGOUT_SUCCESS:
            return {
                name: '',
                isLoggedIn: false,
                role: '',
                error: ''
            }
        case USER_LOGOUT_SUCCESS:
            return {
                id: '',
                name: '',
                isLoggedIn: false,
                role: '',
                error: ''
            }
        case RESET:
            return {
                id: '',
                name: '',
                isLoggedIn: false,
                role: '',
                error: ''
            }
        default: return state

    }
}