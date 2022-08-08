
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import Booking from '../../Model/bookingDetails/Booking';
import BookingDetailsService from '../../Service/bookingDetails/BookingDetailsService';
import HotelService from '../../Service/hotelDetails/HotelService';
import RoomService from '../../Service/roomDetails/RoomDetailsService';
import { updateBookingDetails } from '../../Redux/bookingDetails/bookingActions';


function UpdateBookingDetails() {
    const [state, setState] = useState({ booking: new Booking(), hotels: [], rooms: [] })
    const lg = useSelector(state => state.loginR)

    const bookingService = new BookingDetailsService()
    const hotelService = new HotelService()
    const roomService = new RoomService()
    const navigate = useNavigate()
    const { bookingId } = useParams()
    const dispatch = useDispatch()

    const [hotelNameErr, setHotelNameErr] = useState({})
    const [roomNumberErr, setRoomNumberErr] = useState({})
    const [fromDateErr, setFromDateErr] = useState({})
    const [toDateErr, setToDateError] = useState({})
    const [adultErr, setAdultErr] = useState({})

    //load the bookingDetails by bookingId, 
    //load roomDetails for that booking,
    //load the available rooms for that hotel where the booking has benn done
    //load the details of the hotel
    useEffect(() => async () => {
        let bookingDetails;
        let prevRoom;
        let availableRoom;
        let hotelDetails;

        await bookingService.getBookingDetailsById(bookingId)
            .then(response => {
                bookingDetails = response.data
            })
            .catch(error => {
                console.log(error)
            })

        await roomService.getRoomDetails(bookingDetails.roomId)
            .then(response => {
                prevRoom = response.data
            })

        await roomService.getAvailableRoomByhotelId(bookingDetails.hotelId)
            .then(response => {
                availableRoom = [prevRoom].concat(response.data)
            })

        await hotelService.getAllHotel()
            .then(response => {
                //console.log(response.data)
                hotelDetails = [{ hotelId: -1, hotelName: "Select hotel.." }].concat(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        console.log('Inside useEffect' + availableRoom)
        setState({ booking: bookingDetails, hotels: hotelDetails, rooms: availableRoom })
    }, [])

    //if data is validated this function is called
    //this function dispatching the update action
    const submitHandler = () => {

        console.log('Inside updateSubmitHandler()')
        let booking = state.booking
        //console.log(booking.toString())

        //calculating no of days between check in and cheeck out date
        let timeDiff = (new Date(booking.bookingToDate).getTime() - new Date(booking.bookingFromDate).getTime())
        let dayDiff = (timeDiff / (1000 * 3600 * 24))
        //console.log(state.rooms)

        //getting the room rate for selected room
        let matchedRoom = state.rooms.filter(room => room.roomId == state.booking.roomId)
        let roomRate = (matchedRoom[0].ratePerDay)

        //calculating the total amount to be paid
        let payment = dayDiff === 0 ? roomRate : dayDiff * roomRate
        //console.log('payment --  '+payment)

        //console.log(booking)
        if (window.confirm(`Press Ok to pay the amount of Rs. ${payment}`)) {
            dispatch(updateBookingDetails(booking))
            alert('Booking details updated')
        }
        else
            alert('Sorry!! Updation Failed')

        navigate('/bookings')
    }

    //validating all the form fields and 
    //setting the erorr messages where applicable
    //this function is called on submit of form
    const formValidation = (e) => {
        e.preventDefault()
        // console.log('Inside formValidation')
        let booking = state.booking
        console.log(booking)

        let isValid = true

        let hnerr = ''
        let rnerr = ''
        let cinerr = ''
        let couterr = ''
        let aderr = ''

        if (booking.hotelId === '-1' || !booking.hotelId) {
            //alert('Please select Hotel')
            hnerr = 'Please select Hotel'
            isValid = false
        }
        if (document.getElementById('roomId').value === '-1') {
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
        rnerr ? setRoomNumberErr({ error: rnerr, class: 'is-invalid' }) : setRoomNumberErr({ error: '', class: 'is-valid' })
        cinerr ? setFromDateErr({ error: cinerr, class: 'is-invalid' }) : setFromDateErr({ error: '', class: 'is-valid' })
        couterr ? setToDateError({ error: couterr, class: 'is-invalid' }) : setToDateError({ error: '', class: 'is-valid' })
        aderr ? setAdultErr({ error: aderr, class: 'is-invalid' }) : setAdultErr({ error: '', class: 'is-valid' })

        if (isValid)
            submitHandler()
    }

    //loading the available rooms depending on the selected hotel
    const loadRooms = (hotelId) => {
        //console.log(state.booking.hotelId)
        hotelId === '-1' ? setState({ ...state, booking: { ...state.booking, hotelId: hotelId }, rooms: [{ roomId: -1, roomNo: "Select Room.." }] }) :
            roomService.getAvailableRoomByhotelId(hotelId)
                .then(response => {
                    response.data.length === 0 ?
                        setState({ ...state, booking: { ...state.booking, hotelId: hotelId }, rooms: [{ roomId: -1, roomNo: "Select Room.." }] })
                        : setState({ ...state, booking: { ...state.booking, hotelId: hotelId }, rooms: [{ roomId: -1, roomNo: "Select Room.." }].concat(response.data) })

                    response.data.length === 0 && alert('Sorry! No rooms are available in this hotel')

                })
    }

    return (
        lg.isLoggedIn && lg.role === 'admin' ?
            <div className='mt-5 container-fluid w-50 border p-5' style={{ backgroundColor: '#F2F3F4', borderRadius: '10px' }}>
                <h2 className='mb-4' style={{ color: 'goldenRod' }}>Update Booking Form</h2>
                <form onSubmit={formValidation}>
                    <div className='mb-3'>
                        <label className='form-label booking'> Booking Id </label><br />
                        <input type='text' className='form-control' value={state.booking.bookingId} readOnly={true} disabled />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> Hotel Name </label><br />
                        <select className={`form-select ${hotelNameErr.class}`} value={state.booking.hotelId} id='hotelId'
                            onClick={() => { setHotelNameErr({}) }}
                            onChange={e => {
                                setState({ ...state, booking: { ...state.booking, hotelId: e.target.value } })

                                loadRooms(e.target.value)
                            }
                            }>
                            {
                                state.hotels.length > 0 &&
                                state.hotels.map(hotel => (
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
                        <input type='text' className='form-control' name='userId' placeholder='User Id'
                            value={state.booking.userId} readOnly={true} disabled
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> Room Number </label><br />
                        <select className={`form-select ${roomNumberErr.class}`} value={state.booking.roomId} id='roomId'
                            onClick={() => { setRoomNumberErr({}) }}
                            onChange={e => { setState({ ...state, booking: { ...state.booking, roomId: e.target.value } }) }} >

                            {
                                state.rooms.length > 0 &&
                                state.rooms.map(room => (
                                    <option value={room.roomId}>
                                        {room.roomNo} - {room.roomType}
                                    </option>
                                ))
                            }
                        </select>
                        {roomNumberErr.error ? <div style={{ color: "red" }}>{roomNumberErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'>Check In date</label><br />
                        <input className={`form-select ${fromDateErr.class}`} type='date' placeholder='Check In date'
                            value={state.booking.bookingFromDate} id='checkInDate' min={new Date().toISOString().split('T')[0]}
                            onClick={() => { setFromDateErr({}) }}
                            onChange={e => {
                                setState({ ...state, booking: { ...state.booking, bookingFromDate: e.target.value } })
                            }} />
                        {fromDateErr.error ? <div style={{ color: "red" }}>{fromDateErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'>Check Out date</label><br />
                        <input className={`form-select ${toDateErr.class}`} type='date' name='bookingToDate' min={state.booking.bookingFromDate}
                            value={state.booking.bookingToDate} id='checkOutDate'
                            onClick={() => { setToDateError({}) }}
                            onChange={e => {
                                setState({ ...state, booking: { ...state.booking, bookingToDate: e.target.value } })
                            }} />
                        {toDateErr.error ? <div style={{ color: "red" }}>{toDateErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> No. of Guest </label><br />
                        <input type='number' className={`form-select ${adultErr.class}`} placeholder='no. Of Adults' min='1'
                            value={state.booking.noOfAdults} id='noOfAdults'
                            onClick={() => { setAdultErr({}) }}
                            onChange={e => {
                                setState({ ...state, booking: { ...state.booking, noOfAdults: e.target.value } })
                            }} />
                        {adultErr.error ? <div style={{ color: "red" }}>{adultErr.error}</div> : null}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label booking'> No. of Children </label><br />
                        <input type='number' className='form-control' placeholder='no. Of Children'
                            value={state.booking.noOfChildren}
                            onChange={e => {
                                setState({ ...state, booking: { ...state.booking, noOfChildren: e.target.value } })
                            }} />
                    </div>

                    <div class="d-grid gap-2">
                        <button className='btn btn-primary my-3' type='submit'>Update Booking</button>
                    </div>
                </form>
            </div>
            : <><center><h2 className='mt-5'>Error !! Admin is not logged in </h2> </center>
                {setTimeout(() => {
                    navigate('/login')
                }, 2000)} </>
    )
}

export default UpdateBookingDetails
