

import UserService from '../../Service/userDetails/UserService';
import {
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    ADD_USER_REQUEST,
    UPDATE_USER_REQUEST,
    DELETE_USER_REQUEST,
    DELETE_USER_REQUEST_FAILURE,
    UPDATE_USER_REQUEST_FAILURE,
    ADD_USER_REQUEST_FAILURE
} from './userType';

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    };
};
export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    };
};
export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error,
    };
};

export const addUserRequest = (user) => {
    return {
        type: ADD_USER_REQUEST,
        payload: user,
    }
};

export const updateUserRequest = (user) => {
    return {
        type: UPDATE_USER_REQUEST,
        payload: user,
    }
};

export const deleteUserRequest = (userId) => {
    return {
        type: DELETE_USER_REQUEST,
        payload: userId,
    }
}

export const addUserFailure = (error) => {
    return {
        type: ADD_USER_REQUEST_FAILURE,
        payload: error,
    };
};

export const updateUserFailure = (error) => {
    return {
        type: UPDATE_USER_REQUEST_FAILURE,
        payload: error,
    };
};

export const deleteUserFailure = (error) => {
    return {
        type: DELETE_USER_REQUEST_FAILURE,
        payload: error,
    };
};





export const fetchUser = () => {
    return (dispatch) => {
        let service = new UserService();
       
        service.showAllUser()
            .then((response) => {
                const user = response.data;

                dispatch(fetchUserSuccess(user));//take action as parameter,reudcer is triggered
            })
            .catch((error) => {
                dispatch(fetchUserFailure(error.response.data.message));
            });
    };
};

export const addUser = (user) => {
    return (dispatch) => {
        let service = new UserService();
        service.addUser(user)
            .then((response) => {
                const data = response.data;

                dispatch(addUserRequest(data));

            })
            .catch((error) => {
                dispatch(addUserFailure(error.message));
            });

    };
};

export const updateUser = (user) => {
    return (dispatch) => {
        let service = new UserService();
        service.updateUser(user)
            .then((response) => {
                const data = response.data;
                dispatch(updateUserRequest(data));
            })
            .catch((error) => {
                dispatch(updateUserFailure(error.message));
            });


    };
};


export const deleteUser = (userId) => {
    return (dispatch) => {
        let service = new UserService();
        service.deleteUserById(userId)
            .then((response) => {
                dispatch(deleteUserRequest(userId));
            })
            .catch((error) => {
                dispatch(deleteUserFailure(error.message));
            });
    };
};