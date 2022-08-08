import './roomStyle.css'
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateRoomDetails, } from '../../Redux/roomDetails/RoomDetailsAction'
import { ROOM_DETAILS_UPDATE_RESET } from '../../Redux/roomDetails/RoomDetailsTypes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHotelDetails } from '../../Redux/hotelDetails/hotelActions'
import HotelService from '../../Service/hotelDetails/HotelService';
import RoomDetailsService from '../../Service/roomDetails/RoomDetailsService';
import RoomDetails from '../../Model/roomDetails/RoomDetails';


//Functional Component
const UpdateRoomDetails = () => {
    const navigate = useNavigate()
    const [roomDetails, setRoomDetails] = useState(new RoomDetails());
    const [hotels, setHotels] = useState([])
    const [photo, setPhoto] = useState([]);
    const hotelService = new HotelService()
    const roomDetailsService = new RoomDetailsService();
    const dispatch = useDispatch();
    const { id } = useParams();
    const lg = useSelector(state => state.loginR);

    //fetching error , success from state
    const { error, success } = useSelector((state) => state.updateRoomDetailsReducer);

    const [roomNoError, setRoomNoError] = useState({})
    const [roomTypeError, setRoomTypeError] = useState({})
    const [photoError, setPhotoError] = useState({})
    const [RatePerDayError, setRatePerDayError] = useState({})
    const [hotelIdError, setHotelIdError] = useState({})

    //using toastify for showing alert. toast.success method called when a success is true
    const successMsg = () => toast.success('Room Updated Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //using toastify for showing alert. toast.error method called when a success is false
    const errorMsg = () => toast.error('Room Not Updated! There is some error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    //calling submitHandler after formValidation . submitHandler dispatching the action    
    const submitHandler = (e) => {
        dispatch(updateRoomDetails(roomDetails));
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

        // if(photo[0]===undefined){
        //     console.log(photo[0])
        //     phoerr = 'please select photo'
        //     isValid = false
        // }

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
        // phoerr ? setPhotoError({error: phoerr, class: 'is-invalid'}) : setPhotoError({error:'',class:'is-valid'})
        rateerr ? setRatePerDayError({ error: rateerr, class: 'is-invalid' }) : setRatePerDayError({ error: '', class: 'is-valid' })
        hiderr ? setHotelIdError({ error: hiderr, class: 'is-invalid' }) : setHotelIdError({ error: '', class: 'is-valid' })

        if (isValid) {
            console.log('itis')
            submitHandler()
        }
    }

    //checking error and success from state and dispathcing result 
    useEffect(() => {
        roomDetailsService.getRoomDetails(id)
            .then(response => {
                setRoomDetails(response.data)
                console.log(roomDetails)
            })
        hotelService.getAllHotel()
            .then(response => {
                setHotels(response.data)
            })
        if (success) {
            successMsg();
            dispatch({ type: ROOM_DETAILS_UPDATE_RESET })
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


    return (
        lg.isLoggedIn && lg.role === "admin" ?
            <div className="Room">
                <div className="UpdateRoom">
                    {/* <h2>UPDATE ROOM</h2> */}
                    <ToastContainer position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />
                    <div className='mt-5 container-fluid p-5'>
                        <h2 className='mb-4' style={{ borderBottom: "double 3px goldenrod" }}>UPDATE ROOM</h2>
                        <form onSubmit={formValidation}>
                            <div className='mb-1'>
                                <label>Room Id</label><br />
                                <input className="form-control" type="number" name="roomId" value={roomDetails.roomId} onChange={(e) => setRoomDetails({ ...roomDetails, roomId: e.target.value })} disabled />

                            </div>

                            <div className='mb-1'>
                                <label>Room No</label><br />
                                <input className="form-control" type="text" name="roomNo" value={roomDetails.roomNo} onChange={(e) => setRoomDetails({ ...roomDetails, roomNo: e.target.value })} />
                                {roomNoError.error ? <div style={{ color: "red" }}>{roomNoError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>Room Type</label><br />
                                <input className="form-control" type="text" name="roomType" value={roomDetails.roomType} onChange={(e) => setRoomDetails({ ...roomDetails, roomType: e.target.value })} />
                                {roomTypeError.error ? <div style={{ color: "red" }}>{roomTypeError.error}</div> : null}
                            </div><br />
                            <div className='mb-1'>
                                <label>Photo</label><br />
                                <input className="form-control" type="file" name="photo" onChange={handleUpload} />
                                {photoError.error ? <div style={{ color: "red" }}>{photoError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>RatePerDay</label><br />
                                <input className="form-control" type="number" name="ratePerDay" value={roomDetails.ratePerDay} onChange={(e) => setRoomDetails({ ...roomDetails, ratePerDay: e.target.value })} />
                                {RatePerDayError.error ? <div style={{ color: "red" }}>{RatePerDayError.error}</div> : null}
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label>Availability</label><br />
                                <input className="form-control" type="text" name="available" value={roomDetails.available} onChange={(e) => setRoomDetails({ ...roomDetails, available: e.target.value })} />
                            </div>
                            <br />
                            <div className='mb-1'>
                                <label for="hotel">Hotel Id</label><br />
                                {/* <input className="form-control" type="number" name="hotelId" value={hotelId} onChange={(e) => setHotelId(e.target.value)} /> */}
                                <select className="form-select" name="hotelId" id="hotelId" value={roomDetails.hotelId} onChange={(e) => setRoomDetails({ ...roomDetails, hotelId: e.target.value })}>
                                    <option type="number" value={''}>---SelectHotel---</option>
                                    {
                                        hotels.map(hotel => (
                                            <option type="number" value={hotel.hotelId}>{hotel.hotelName}</option>
                                        ))
                                    }
                                </select>
                                {hotelIdError.error ? <div style={{ color: "red" }}>{hotelIdError.error}</div> : null}

                            </div>
                            <br />


                            <button id="button" type="submit" className="btn btn-primary">Submit</button>
                            <br />

                        </form>
                        <hr />
                    </div>
                </div>

            </div>
            :
            <>
            <h2>Admin Not Logged In</h2>
            {setTimeout(() => {
                navigate('/login')
            }, 2000)} </>
            
    );
};

export default UpdateRoomDetails;