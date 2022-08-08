import './bookingStyle.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Booking from '../../Model/bookingDetails/Booking'
import { useParams } from 'react-router'
import HotelService from '../../Service/hotelDetails/HotelService';
import RoomService from '../../Service/roomDetails/RoomDetailsService';
import { addBookingDetails } from '../../Redux/bookingDetails/bookingActions'

function AddBookingDetail() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hotelNameErr, setHotelNameErr] = useState({})
    const [userNameErr, setUserNameErr] = useState({})
    const [roomNumberErr, setRoomNumberErr] = useState({})
    const [fromDateErr, setFromDateErr] = useState({})
    const [toDateErr, setToDateError] = useState({})
    const [adultErr, setAdultErr] = useState({})

    let hotelService = new HotelService()
    let roomService = new RoomService()
    const [booking, setBooking] = useState(new Booking())
    const [hotels, setHotels] = useState([])
    const [rooms, setRooms] = useState([])
    const lg = useSelector(state => state.loginR)

    //if data is validated this function is called
    //this function dispatching the add booking action
    const submitHandler = () => {

        //calculating no of days between check in and cheeck out date
        let timeDiff = (new Date(booking.bookingToDate).getTime() - new Date(booking.bookingFromDate).getTime())
        let dayDiff = (timeDiff / (1000 * 3600 * 24))

        //getting the room rate for selected room
        let matchedRoom = rooms.filter(room => room.roomId == booking.roomId)
        let roomRate = (matchedRoom[0].ratePerDay)

        //calculating the total amount to be paid
        let payment = dayDiff === 0 ? roomRate : dayDiff * roomRate

        if (window.confirm(`Press Ok to pay the amount of Rs. ${payment}`)) {
            dispatch(addBookingDetails(booking))
            alert('Thank you for the payment!! Booking is confirmed')
            navigate('/')
        }
        else
            alert('Sorry!! Booking Cancelled')

    }

    //validating all the form fields and 
    //setting the erorr messages where applicable
    //this function is called on submit of form
    const formValidation = (e) => {
        e.preventDefault()
        console.log(booking)
        let isValid = true

        let hnerr = ''
        let unerr = ''
        let rnerr = ''
        let cinerr = ''
        let couterr = ''
        let aderr = ''

        if (booking.hotelId === '-1' || !booking.hotelId) {
            //alert('Please select Hotel')
            hnerr = 'Please select Hotel'
            isValid = false
        }
        if (!booking.userId) {
            unerr = 'Please enter your userId'
            isValid = false
        }
        if (document.getElementById('roomId').value === '-1' || !booking.roomId) {
            //alert('Please select Room number')
            rnerr = 'Please select Room number'
            isValid = false
        }
        if (!booking.bookingFromDate) {
            cinerr = 'Select Check-in date'
            isValid = false
        }
        if (!booking.bookingToDate) {
            couterr = 'Select Check-out date'
            isValid = false
        }
        if (!booking.noOfAdults) {
            aderr = 'Select number of adults'
            isValid = false
        }

        hnerr ? setHotelNameErr({ error: hnerr, class: 'is-invalid' }) : setHotelNameErr({ error: '', class: 'is-valid' })
        unerr ? setUserNameErr({ error: unerr, class: 'is-invalid' }) : setUserNameErr({ error: '', class: 'is-valid' })
        rnerr ? setRoomNumberErr({ error: rnerr, class: 'is-invalid' }) : setRoomNumberErr({ error: '', class: 'is-valid' })
        cinerr ? setFromDateErr({ error: cinerr, class: 'is-invalid' }) : setFromDateErr({ error: '', class: 'is-valid' })
        couterr ? setToDateError({ error: couterr, class: 'is-invalid' }) : setToDateError({ error: '', class: 'is-valid' })
        aderr ? setAdultErr({ error: aderr, class: 'is-invalid' }) : setAdultErr({ error: '', class: 'is-valid' })

        if (isValid)
            submitHandler()
    }

    //loading the available rooms depending on the selected hotel
    const loadRooms = (hotelId) => {
        //console.log(hotelId)
        hotelId === '-1' ? setRooms([{ roomId: '-1', roomNo: "Select Room.." }]) :
            roomService.getAvailableRoomByhotelId(hotelId)
                .then(response => {
                    //console.log(response.data.length)
                    response.data.length === 0 ? setRooms([{ roomId: '-1', roomNo: "Select Room.." }])
                        : setRooms([{ roomId: -1, roomNo: "Select Room.." }].concat(response.data))

                    response.data.length === 0 && alert('Sorry! No rooms are available in this hotel')
                    response.data.length === 0 && setBooking({ ...booking, roomId: '-1' })
                })
                .catch(error => console.log(error))
    }

    //getting the room no and the corresponding hotel if we get roomId as a path parameter
    //orElse get the details of all hotel
    useEffect(() => {
        //console.log('---'+roomId)
        if (roomId) {
            roomService.getRoomDetails(roomId)
                .then(response => {
                    setBooking({ ...booking, userId: lg.id, roomId: roomId, hotelId: response.data.hotelId })
                    roomService.getAvailableRoomByhotelId(response.data.hotelId)
                        .then(response => {
                            setRooms(response.data)
                        })
                })
        }
        else {
            setBooking({ ...booking, userId: lg.id })
            setRooms([{ roomId: -1, roomNo: "Select Room.." }])
        }
        hotelService.getAllHotel()
            .then(response => {
                //console.log(response.data)
                setHotels([{ hotelId: -1, hotelName: "Select hotel.." }].concat(response.data))
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    return (
        lg.isLoggedIn && lg.role === 'user' ?
            <div className='mt-5 container-fluid w-50 border p-5' style={{ backgroundColor: '#F2F3F4', borderRadius: '10px' }}>
                <h2 className='mb-4' style={{ color: 'goldenRod' }}>Booking Form</h2>
                <form onSubmit={formValidation} >
                    <div className='mb-3'>
                        <label className='form-label booking'> Hotel Name </label><br />
                        <select className={`form-select ${hotelNameErr.class}`} value={booking.hotelId} id='hotelId'
                            onClick={() => { setHotelNameErr({}) }}
                            onChange={e => {
                                setBooking({ ...booking, hotelId: e.target.value })
                                loadRooms(e.target.value)
                            }
                            }>
                            {
                                hotels.length > 0 &&
                                hotels.map(hotel => (
                                    <option value={hotel.hotelId}>
                                        {hotel.hotelName}
                                    </option>
                                ))
                            }
                        </select>
                        {hotelNameErr.error ? <div style={{ color: "red" }}>{hotelNameErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> User Id </label><br />
                        <input type='text' className={`form-control ${userNameErr.class}`} readOnly={true} disabled
                            value={lg.id}
                            onChange={e => {
                                setBooking({ ...booking, userId: e.target.value })
                            }} />
                        {userNameErr.error ? <div style={{ color: "red" }}>{userNameErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> Room Number </label><br />
                        <select className={`form-select ${roomNumberErr.class}`} value={booking.roomId} id='roomId'
                            onClick={() => { setRoomNumberErr({}) }}
                            onChange={e => { setBooking({ ...booking, roomId: e.target.value }) }} >
                            {
                                rooms.length > 0 &&
                                rooms.map(room => (
                                    <option value={room.roomId}>
                                        {room.roomNo}
                                    </option>
                                ))
                            }
                        </select>
                        {roomNumberErr.error ? <div style={{ color: "red" }}>{roomNumberErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'>Check In date</label> <br />
                        <input className={`form-select ${fromDateErr.class}`} type='date' id='checkInDate'
                            value={booking.bookingFromDate} min={new Date().toISOString().split('T')[0]}
                            onClick={() => { setFromDateErr({}) }}
                            onChange={e => {
                                setBooking({ ...booking, bookingFromDate: e.target.value })
                            }} />
                        {fromDateErr.error ? <div style={{ color: "red" }}>{fromDateErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'>Check Out date</label><br />
                        <input className={`form-select ${toDateErr.class}`} type='date' min={booking.bookingFromDate} id='checkOutDate'
                            value={booking.bookingToDate}
                            onClick={() => { setToDateError({}) }}
                            onChange={e => {
                                setBooking({ ...booking, bookingToDate: e.target.value })
                            }} />
                        {toDateErr.error ? <div style={{ color: "red" }}>{toDateErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> No. of Guest </label><br />
                        <input type='number' className={`form-select ${adultErr.class}`} placeholder='no. Of Adults' min='1' id='noOfAdults'
                            value={booking.noOfAdults}
                            onClick={() => { setAdultErr({}) }}
                            onChange={e => {
                                setBooking({ ...booking, noOfAdults: e.target.value })
                            }} />
                        {adultErr.error ? <div style={{ color: "red" }}>{adultErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> No. of Children </label><br />
                        <input type='number' className='form-control' placeholder='no. Of Children'
                            value={booking.noOfChildren}
                            onChange={e => {
                                setBooking({ ...booking, noOfChildren: e.target.value })
                            }} />
                    </div>

                    <div className="d-grid gap-2">
                        <button className='btn btn-primary my-3' type='submit'>Create Booking</button>
                    </div>
                </form>
            </div>
            : <><center><h2 className='mt-5'>Error !! User is not logged in </h2> </center>
                {setTimeout(() => {
                    navigate('/login')
                }, 2000)} </>

    )
}

export default AddBookingDetail
