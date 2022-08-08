import './roomStyle.css'
import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addRoomDetails } from '../../Redux/roomDetails/RoomDetailsAction'
import { useNavigate } from 'react-router-dom';
import { ROOM_DETAILS_ADD_RESET } from '../../Redux/roomDetails/RoomDetailsTypes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHotelDetails } from '../../Redux/hotelDetails/hotelActions'
import HotelService from '../../Service/hotelDetails/HotelService';
import RoomDetails from '../../Model/roomDetails/RoomDetails';

//Add Room Details Functional Component
const AddRoomDetails = () => {
    const navigate = useNavigate()
    const [roomDetails, setRoomDetails] = useState(new RoomDetails());
    const [photo, setPhoto] = useState([]);
    const [hotels, setHotels] = useState([])
    const dispatch = useDispatch();

    const hotelService = new HotelService()

    const [roomNoError, setRoomNoError] = useState({})
    const [roomTypeError, setRoomTypeError] = useState({})
    const [photoError, setPhotoError] = useState({})
    const [RatePerDayError, setRatePerDayError] = useState({})
    const [availableError, setAvailableError] = useState({})
    const [hotelIdError, setHotelIdError] = useState({})

    const lg = useSelector(state => state.loginR);

    //using toastify for showing alert. toast.success method called when a success is true
    const successMsg = () => toast.success('Room Added Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //using toastify for showing alert. toast.error method called when a success is false
    const errorMsg = () => toast.error('Room Not Added! There is some error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //fetching error , success from state
    const { error, success } = useSelector((state) => state.addRoomDetailsReducer);

    //calling submitHandler after formValidation . submitHandler dispatching the action
    function submitHandler(e) {
        dispatch(addRoomDetails(roomDetails));
        setTimeout(() => {
            navigate('/rooms')
        }, 1000);
    }

    //calling formValidation onSubmit of form. validating the form details. if validation is true then calling submitHandler. 
    const formValidation = (e) => {
        e.preventDefault();
        let isValid = true
        let rnerr = ''
        let rterr = ''
        let phoerr = ''
        let rateerr = ''
        let averr = ''
        let hiderr = ''


        if (roomDetails.roomNo === '-1' || !roomDetails.roomNo) {
            rnerr = 'please enter correct room number'
            isValid = false
        }

        if (!roomDetails.roomType) {
            rterr = 'please enter room type'
            isValid = false
        }

        if (photo[0] === undefined) {
            console.log(photo[0])
            phoerr = 'please select photo'
            isValid = false
        }

        if (!roomDetails.ratePerDay || roomDetails.ratePerDay === '-1') {
            rateerr = 'rate is not correct'
            isValid = false
        }

        if (roomDetails.hotelId === '1' || !roomDetails.hotelId) {
            hiderr = 'Please select a hotel'
            isValid = false
        }

        rnerr ? setRoomNoError({ error: rnerr, class: 'is-invalid' }) : setRoomNoError({ error: '', class: 'is-valid' })
        rterr ? setRoomTypeError({ error: rterr, class: 'is-invalid' }) : setRoomTypeError({ error: '', class: 'is-valid' })
        phoerr ? setPhotoError({ error: phoerr, class: 'is-invalid' }) : setPhotoError({ error: '', class: 'is-valid' })
        rateerr ? setRatePerDayError({ error: rateerr, class: 'is-invalid' }) : setRatePerDayError({ error: '', class: 'is-valid' })
        hiderr ? setHotelIdError({ error: hiderr, class: 'is-invalid' }) : setHotelIdError({ error: '', class: 'is-valid' })

        if (isValid) {
            console.log('itis')
            submitHandler()
        }
    }

    //useEffect calling getAllHotel from hotelService
    useEffect(() => {
        hotelService.getAllHotel()
            .then(response => {
                setHotels(response.data)
            })
    }, [])

    //checking error and success from state and dispathcing result 
    useEffect(() => {
        roomDetails.available = true
        if (success) {
            successMsg();
            dispatch({ type: ROOM_DETAILS_ADD_RESET })
        }
        else if (error)
            errorMsg();
    }, [dispatch, error, success]);

    //handleUpload is handling picture. converting the image into ByteArray format and setting to hooks
    let byteArray;
    const handleUpload = async (e) => {
        let image = e.currentTarget.files[0];
        const buffer = await image.arrayBuffer();
        byteArray = new Int8Array(buffer);
        var array = Array.from(byteArray);
        setPhoto(array);
        setRoomDetails({ ...roomDetails, photo: array })
    }

    console.log(photo.length);
    console.log(roomDetails)

    return (
        lg.isLoggedIn && lg.role === "admin" ?
            <div className="Room">
                <div className="AddRoom">
                    {/* <h2>ADD ROOM</h2> */}
                    <ToastContainer position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />

                    <div className='mt-5 container-fluid p-5' >
                        <h2 className='mb-4' style={{ borderBottom: "double 3px goldenrod" }}>ADD ROOM</h2>
                        <form onSubmit={formValidation}>
                            <div className='mb-1'>
                                <label>Room No</label><br />
                                <input className="form-control" type="text" name="roomNo" value={roomDetails.roomNo} onChange={(e) => setRoomDetails({ ...roomDetails, roomNo: e.target.value })} />
                                {roomNoError.error ? <div style={{ color: "#dc3545" }}>{roomNoError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>Room Type</label><br />
                                <input className="form-control" type="text" name="roomType" value={roomDetails.roomType} onChange={(e) => setRoomDetails({ ...roomDetails, roomType: e.target.value })} />
                                {roomTypeError.error ? <div style={{ color: "#dc3545" }}>{roomTypeError.error}</div> : null}
                            </div><br />
                            <div className='mb-1'>
                                <label>Photo</label><br />
                                <input className="form-control" type="file" name="photo" onChange={handleUpload} />
                                {photoError.error ? <div style={{ color: "#dc3545" }}>{photoError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>RatePerDay</label><br />
                                <input className="form-control" type="number" name="ratePerDay" value={roomDetails.ratePerDay} onChange={(e) => setRoomDetails({ ...roomDetails, ratePerDay: e.target.value })} />
                                {RatePerDayError.error ? <div style={{ color: "#dc3545" }}>{RatePerDayError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>Availability</label><br />
                                <input className="form-control" type="text" name="available" disabled value={true} onChange={(e) => setRoomDetails({ ...roomDetails, isAvailable: "true" })} />

                            </div>
                            <br />
                            <div className='mb-1'>
                                <label for="hotel">Hotel Id</label><br />
                                <select className="form-select" name="hotelId" id="hotelId" value={roomDetails.hotelId} onChange={(e) => setRoomDetails({ ...roomDetails, hotelId: e.target.value })}>
                                    <option type="number" value={''}>---SelectHotel---</option>
                                    {
                                        hotels.map(hotel => (
                                            <option type="number" value={hotel.hotelId}>{hotel.hotelName}</option>
                                        ))
                                    }
                                </select>
                                {hotelIdError.error ? <div style={{ color: "#dc3545" }}>{hotelIdError.error}</div> : null}
                            </div>
                            <br />


                            <button id="button" type="submit" className="btn btn-success">Submit</button>
                            <br />
                            <hr />
                        </form>
                    </div>
                </div>
            </div>
            : <>
            <h2>Admin Not Logged In</h2>
            {setTimeout(() => {
                navigate('/login')
            }, 2000)} </>
    );
}

export default AddRoomDetails;