import {
    ALL_ROOM_DETAILS_REQUEST, ALL_ROOM_DETAILS_SUCCESS, ALL_ROOM_DETAILS_FAILURE,
    ROOM_DETAILS_ADD_REQUEST, ROOM_DETAILS_ADD_SUCCESS, ROOM_DETAILS_ADD_FAILURE,
    ROOM_DETAILS_UPDATE_REQUEST, ROOM_DETAILS_UPDATE_SUCCESS, ROOM_DETAILS_UPDATE_FAILURE,
    ROOM_DETAILS_DELETE_REQUEST, ROOM_DETAILS_DELETE_SUCCESS, ROOM_DETAILS_DELETE_FAILURE,
    ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS ,ROOM_DETAILS_FAILURE
} from './RoomDetailsTypes'

import RoomDetailsService from '../../Service/roomDetails/RoomDetailsService'

const RoomDetails =  new RoomDetailsService()

export const allRoomDetailsRequest = () => {
    return {
        type: ALL_ROOM_DETAILS_REQUEST
    }
}

export const allRoomDetailsSuccess = (rooms) => {
    return {
        type: ALL_ROOM_DETAILS_SUCCESS,
        payload: rooms
    }
}

export const allRoomDetailsFailure = (error) => {
    return {
        type: ALL_ROOM_DETAILS_FAILURE,
        payload: error
    }
}

export const roomDetailsAddRequest = (roomDetails) => {
    return {
        type: ROOM_DETAILS_ADD_REQUEST,
        payload: roomDetails
    }
}

export const roomDetailsUpdateRequest = (roomDetails) => {
    return {
        type: ROOM_DETAILS_UPDATE_REQUEST,
        payload: roomDetails
    }
}

export const roomDetailsDeleteRequest = (roomDetails) => {
    return {
        type: ROOM_DETAILS_DELETE_REQUEST,
        payload: roomDetails
    }
}


export const roomDetailsRequest = (room) => {
    return {
        type: ALL_ROOM_DETAILS_SUCCESS,
        payload: room
    }
}

export const allRoomDetails = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_ROOM_DETAILS_REQUEST });
        const { data } = await RoomDetails.getAllRoomDetails();
        
        dispatch({
            type: ALL_ROOM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ROOM_DETAILS_FAILURE,
            payload: error
        })
    }
}


export const addRoomDetails = (roomDetails) => async (dispatch) => {

    try {
        console.log(roomDetails)
        dispatch({ type: ROOM_DETAILS_ADD_REQUEST });
        const { data } = await RoomDetails.addRoomDetails(roomDetails);
        dispatch({
            type: ROOM_DETAILS_ADD_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_ADD_FAILURE,
            payload: error
        })
    }
}

export const updateRoomDetails = (roomDetails) => async (dispatch) => {
    try {
        dispatch({ type: ROOM_DETAILS_UPDATE_REQUEST });
        const { data } = await RoomDetails.updateRoomDetails(roomDetails);
        dispatch({
            type: ROOM_DETAILS_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_UPDATE_FAILURE,
            payload: error
        })
    }
}


export const deleteRoomDetails = (roomId) => async (dispatch) => {
    try {
        dispatch({ type: ROOM_DETAILS_DELETE_REQUEST });
        const { data } = await RoomDetails.deleteRoomDetails(roomId)
        dispatch({
            type: ROOM_DETAILS_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_DELETE_FAILURE,
            payload: error
        })
    }
}

export const roomDetails = (roomId) => async (dispatch) => {

    try {
        dispatch({ type: ROOM_DETAILS_REQUEST });
        const { data } = await RoomDetails.getRoomDetails(roomId);
        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAILURE,
            payload: error
        })
    }
}

export const roomByHotelId = (hotelId) => async (dispatch) => {

    try {
        dispatch({ type: ROOM_DETAILS_REQUEST });
        const { data } = await RoomDetails.getRoomByHotelId(hotelId);
        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAILURE,
            payload: error
        })
    }
}