import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getHotelDetails, deleteHotel } from '../../Redux/hotelDetails/hotelActions'

function GetAllHotels() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { hotels } = useSelector(state => state.hotelR);
    const lg = useSelector(state => state.loginR);
    const isLoggedIn = true
    const role = "admin"

    useEffect(() => {
        //console.log('method called')
        dispatch(getHotelDetails())
    }, [])

    const deleteHandler = (hotel) => {
        dispatch(deleteHotel(hotel.hotelId))
        alert('Deleted sucessfully')
        navigate('/hotels')
    }

    return (
        <div className="container-fluid">
            {
                lg.isLoggedIn === true && lg.role === "admin" &&
                <Link to="/addhotel" type="button" className="btn btn-outline-success mt-3">+Add Hotel</Link>
            }
            <h2 className='text-center'>List of Hotels</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Address</th>
                        <th scope="col">Average Rate</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {
                    hotels.map(hotel => (
                        <tbody>
                            <tr key={hotel.hotelId}>
                                <th scope="row">{hotel.hotelName}</th>
                                <td>{hotel.city}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.avgRatePerDay}</td>
                                <td>{hotel.email}</td>
                                <td>{hotel.phone1}</td>
                                {
                                    lg.isLoggedIn === true && lg.role === "admin" ?
                                        <td>
                                            <Link to={`/updatehotel/${hotel.hotelId}`} style={{width : '90px'}}
                                                class="btn btn-outline-warning btn-sm">
                                                Update
                                            </Link><br />
                                            <button className="btn btn-outline-danger btn-sm mt-1" style={{width : '90px'}}
                                                onClick={() => deleteHandler(hotel)}>
                                                Delete
                                            </button><br />
                                            <Link to={`/hotel/${hotel.hotelId}`} style={{width : '90px'}}
                                                className="btn btn-outline-primary btn-sm mt-1">
                                                View Rooms
                                            </Link>
                                        </td>
                                        :
                                        <td>
                                            <Link to={`/hotel/${hotel.hotelId}`} className="btn btn-outline-primary btn-sm">View Rooms</Link>
                                        </td>
                                }


                            </tr>
                        </tbody>
                    ))
                }
            </table>



        </div>
    );
}

export default GetAllHotels;