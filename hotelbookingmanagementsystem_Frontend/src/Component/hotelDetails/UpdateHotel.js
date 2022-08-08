import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Hotel from "../../Model/hotelDetails/Hotel";
import HotelService from "../../Service/hotelDetails/HotelService";
import { updateHotel } from '../../Redux/hotelDetails/hotelActions'

function UpdateHotel() {
    let dispatch = useDispatch();

    let navigate = useNavigate();

    let { hotelId } = useParams();

    const [state, setState] = useState({ hotel: new Hotel() })

    let service = new HotelService();

    useEffect(() => {
        service.getHotelById(hotelId)
            .then((result) => {
                setState({ ...state, hotel: result.data })

            })
            .catch((error) => {
                alert(error)
            });
    }, []);


    function clickHandle(e) {
        e.preventDefault();
        console.log(state.hotel)
        dispatch(updateHotel(state.hotel));
        alert('Hotel Updated successfully')
        navigate('/hotels');
    }

    return (
        <div className="container-fluid mt-3 w-75">
            <h2>Update Hotel Form</h2>
            <form>
                <div className='my-3'>
                    <label>Hotel Id</label><br />
                    <input className="form-control" type="text" disabled
                        value={state.hotel.hotelId}
                    />
                </div>

                <div className='my-3'>
                    <label>Hotel Name</label><br />
                    <input className="form-control" type="text" placeholder="Enter hotel Name"
                        value={state.hotel.hotelName}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                hotelName: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label>Address</label><br />
                    <input className="form-control" type="text" placeholder="Enter address"
                        value={state.hotel.address}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                address: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label>City</label><br />
                    <input className="form-control" type="text" placeholder="Enter city Name"
                        value={state.hotel.city}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                city: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label>Description</label><br />
                    <input className="form-control" type="text" placeholder="Enter description"
                        value={state.hotel.description}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                description: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label for="Avg Rate Per Day">Avg Rate Per Day</label><br />
                    <input className="form-control" type="text" placeholder="Enter average rate per day"
                        value={state.hotel.avgRatePerDay}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                avgRatePerDay: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label for="email">email</label><br />
                    <input className="form-control" type="text" placeholder="Enter email id"
                        value={state.hotel.email}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                email: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label for="phone1">phone1</label><br />
                    <input className="form-control" type="text" placeholder="Enter phone number"
                        value={state.hotel.phone1}
                        pattern='[1-9][0-9]{9}'
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                phone1: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label for="phone2">phone2</label><br />
                    <input className="form-control" type="text" placeholder="Enter phone number"
                        value={state.hotel.phone2}
                        pattern='[1-9][0-9]{9}'
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                phone2: e.target.value
                            }
                        })}
                        required />
                </div>

                <div className='my-3'>
                    <label for="website">website</label><br />
                    <input className="form-control" type="text" placeholder="Enter website"
                        value={state.hotel.website}
                        onChange={(e) => setState({
                            hotel: {
                                ...state.hotel,
                                website: e.target.value
                            }
                        })}
                        required />
                </div>

                <button className="btn btn-outline-primary mt-3" onClick={clickHandle}
                >Update Hotel</button>

            </form>
        </div>
    )
}

export default UpdateHotel