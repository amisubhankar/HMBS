import loginService from '../../Service/login/loginService'

import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGOUT_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT_SUCCESS,
    RESET
} from './loginTypes'

const service = new loginService()

export const adminLoginSuccess = () => {
    return {
        type: ADMIN_LOGIN_SUCCESS,
    }
}

export const adminLoginFailure = (error) => {
    return {
        type: ADMIN_LOGIN_FAILURE,
        payload: error
    }
}

export const userLoginSuccess = (user) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload:
        {
            id: user.data.userId,
            name: user.data.userName
        }
    }
}

export const userLoginFailure = (error) => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: error
    }
}

export const adminLogoutSuccess = () => {
    return {
        type: ADMIN_LOGOUT_SUCCESS
    }
}

export const userLogoutSuccess = () => {
    return {
        type: USER_LOGOUT_SUCCESS
    }
}

export const loginAction = (loginDetails) => async (dispatch) => {

    console.log('inside loginAction()')
    if (loginDetails.role === 'admin') {
        await service.adminLogin(
            {
                userName: loginDetails.userName,
                password: loginDetails.password
            })
            .then(response => {
                dispatch(adminLoginSuccess())
            })
            .catch(error => {
                dispatch(adminLoginFailure(error))
            })
    }
    else {
        await service.userLogin(
            {
                userName: loginDetails.userName,
                password: loginDetails.password
            })
            .then(response => {
                dispatch(userLoginSuccess(response))
            })
            .catch(error => {
                dispatch(userLoginFailure(error))
            })
    }
}

export const logoutAction = (role) => async (dispatch) => {
    console.log('inside logoutAction()')
    if (role === 'admin') {
        dispatch(adminLogoutSuccess())
    }
    else {
        dispatch(userLogoutSuccess())
    }
}

export const resetDetails = () => (dispatch) => {
    dispatch({
        type: RESET
    })
}