import './roomStyle.css'
import React, { useEffect, Fragment, useState } from 'react';
import { roomByHotelId } from '../../Redux/roomDetails/RoomDetailsAction'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { allRoomDetails, deleteRoomDetails } from '../../Redux/roomDetails/RoomDetailsAction'
import { ROOM_DETAILS_DELETE_RESET } from '../../Redux/roomDetails/RoomDetailsTypes'
import HotelService from '../../Service/hotelDetails/HotelService';


//Funcional Component
export const GetAllRoomByHotelId = () => {
    const navigate = useNavigate()

    //using toastify for showing alert. toast.success method called when a success is true
    const successMsg = () => toast.success('Room Deleted Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //using toastify for showing alert. toast.error method called when a success is false
    const errorMsg = () => toast.error('Room Not Deleted! There is some error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //Using params for fetching id from link address
    const { hotelId } = useParams()
    const dispatch = useDispatch();
    //taking laoading and rooms from state
    const { loading, rooms } = useSelector(state => state.roomByHotelId)
    //taking login details from state
    const lg = useSelector(state => state.loginR);
    const { success, error } = useSelector(state => state.deleteRoomDetailsReducer)
    const [hotelName, setHotelName] = useState('')
    const hotelService = new HotelService();

    //setting hotel name for each room card component
    hotelService.getHotelById(hotelId).then(response => {
        setHotelName(response.data.hotelName)
    })

    //Dispatching the action and cheching error and success and returning result
    useEffect(() => {
        dispatch(roomByHotelId(hotelId))
        if (success) {
            successMsg();
            dispatch({ type: ROOM_DETAILS_DELETE_RESET })
        }
        else if (error)
            errorMsg();
    }, [dispatch, error, success]);

    //console.log(rooms)

    //calling deleteHandler onClick of delete Button
    const deleteHandler = (room) => {
        console.log(room.roomId)
        dispatch(deleteRoomDetails(room.roomId))
    }

    return (
        <Fragment>
            {
                loading
                    ?
                    <></>
                    :
                    (
                        <div className="Rooms">
                            <ToastContainer position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover />
                            <h2>{ }</h2>
                            {
                                rooms.map(room => (
                                    <div className="card" key={room.roomId}>
                                        <img src={`data:image/jpg;base64,${room.photo}`} className="card-img-top" alt="image not available" />
                                        <div className="card-body">
                                            <h3 className="card-title">{hotelName}</h3>
                                            <hr />
                                            <h3 className="card-title">{room.roomType}</h3>
                                            <h4 className="card-title">{`(${room.roomNo})`}</h4>
                                            <h3 className="card-title">{`Rs. ${room.ratePerDay}`}</h3>
                                            {
                                                lg.isLoggedIn && lg.role === "admin" ? <div>
                                                    {/* isLoggedIn ? <div> */}
                                                    <h6 className="card-title">{`Availability : ${room.available.toString()}`}</h6>
                                                    <Link to={`/updateroom/${room.roomId}`} className="btn btn-primary btn-sm">UpdateRoom</Link><br />
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(room)}>DeleteRoom</button>
                                                </div>
                                                    : room.available ?
                                                        lg.isLoggedIn ? <Link to={`/booking/${room.roomId}`} className="btn btn-dark btn-sm">Book Room</Link>
                                                            : <Link to={`/login`} className="btn btn-dark btn-sm">Book Room</Link>
                                                        : <Link to="#" className="btn btn-danger btn-sm disabled" >Not Available</Link>


                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )

            }
        </Fragment>
    );
}

export default GetAllRoomByHotelId;