import './roomStyle.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { allRoomDetails, deleteRoomDetails } from '../../Redux/roomDetails/RoomDetailsAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROOM_DETAILS_DELETE_RESET } from '../../Redux/roomDetails/RoomDetailsTypes'
import HotelService from '../../Service/hotelDetails/HotelService';

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

//Functional Component
const RoomDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    //fetching rooms from state
    const { rooms } = useSelector(state => state.roomReducer)
    //fetching login details from state
    const lg = useSelector(state => state.loginR);
    const { success, error } = useSelector(state => state.deleteRoomDetailsReducer)
    //hotelService method from service
    const hotelService = new HotelService();

    const [hotelName, setHotelName] = useState([])
    //setting hotelname for every room
    for (let i = 0; i < rooms.length; i++) {
        hotelService.getHotelById(rooms[i].hotelId).then(response => {
            setHotelName(arr => [...arr, response.data.hotelName])
        })
    }

    //dispatching action and returning error and success messages
    useEffect(() => {
        dispatch(allRoomDetails())
        if (success) {
            successMsg();
            dispatch({ type: ROOM_DETAILS_DELETE_RESET })
        }
        else if (error)
            errorMsg();
    }, [dispatch, error, success]);

    //calling deleteHandler on click of delete button
    const deleteHandler = (room) => {
        console.log(room.roomId)
        dispatch(deleteRoomDetails(room.roomId))
        navigate('/rooms')
    }

    // console.log(rooms[0].roomId)
    let count = 0;
    return (
        <div className="Rooms">
            <Link to="/addroom" type="button" id="butn" class="btn btn-outline-success btn-sm">+Add Room </Link>

            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <h2>All Rooms</h2>
            {
                rooms.map(room => (
                    <div className="card" key={room.id}>
                        <img src={`data:image/jpg;base64,${room.photo}`} className="card-img-top" alt="image not available" />
                        <div className="card-body">
                            <h3 className="card-title">{hotelName[count++]}</h3>
                            <hr />
                            <h5 className="card-title">{room.roomType}</h5>
                            <h5 className="card-title">{`(${room.roomNo})`}</h5>
                            <h3 className="card-title">{`Rs. ${room.ratePerDay}`}</h3>
                            {/* <hr/> */}
                            {
                                lg.isLoggedIn && lg.role === "admin" ? <div>
                                    {/* isLoggedIn ? <div> */}
                                    <h6 className="card-title">{`Availability : ${room.available.toString()}`}</h6>
                                    <Link to={`/updateroom/${room.roomId}`} className="btn btn-outline-primary btn-sm">UpdateRoom</Link><br />
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(room)}>DeleteRoom</button>
                                </div>
                                    :
                                    !lg.isLoggedIn ?
                                        <Link to={`/login`} className="btn btn-dark btn-sm">Book Room</Link>
                                        : room.available ?
                                            <Link to={`/booking`} className="btn btn-dark btn-sm">Book Room</Link> :
                                            <Link to="#" className="btn btn-danger btn-sm">Not Available</Link>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RoomDetails;