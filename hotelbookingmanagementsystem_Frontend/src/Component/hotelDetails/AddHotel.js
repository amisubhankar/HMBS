import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addHotel } from '../../Redux/hotelDetails/hotelActions'

function AddHotel() {
    const navigate = useNavigate()
    const [hotelName, setHotelName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [avgRatePerDay, setAvgRatePerDay] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [website, setWebsite] = useState('');

    const dispatch = useDispatch();

    const { success, error } = useSelector(state => state.hotelR)

    const OnCreatePost = (e) => {
        e.preventDefault();
        const postData = {
            hotelName, address, city, description, avgRatePerDay
            , email, phone1, phone2, website
        }

        dispatch(addHotel(postData));

    }
    useEffect(() => {
        if (success) {
            alert('Hotel added successfully')
            navigate('/hotels')
        }
        else if (error)
            alert('hotel not added')
    }, [dispatch, error, success]);

    return (
        <div className='container-fluid mt-3 w-75'>
            <h2>Add Hotel Form</h2>
            <form onSubmit={OnCreatePost}>
                <div className='my-3'>
                    <label>Hotel Name</label><br />
                    <input type="text" className="form-control" value={hotelName} required
                    onChange={(e) => setHotelName(e.target.value)} />
                </div>
                
                <div className='my-3'>
                    <label>Address</label><br />
                    <input type="text" className="form-control" value={address} required
                    onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='my-3'>
                    <label>City</label><br />
                    <input type="text" className="form-control" value={city} required
                    onChange={(e) => setCity(e.target.value)} />
                </div>
                
                <div className='my-3'>
                    <label>Description</label><br />
                    <input type="text" className="form-control" value={description} required
                     onChange={(e) => setDescription(e.target.value)} />
                </div>
                
                <div className='my-3'>
                    <label for="Avg Rate Per Day">Avg Rate Per Day</label><br />
                    <input type="number" className="form-control" value={avgRatePerDay} required
                     onChange={(e) => setAvgRatePerDay(e.target.value)} />
                </div>
                
                <div className='my-3'>
                    <label for="email">email</label><br />
                    <input type="email" className="form-control" value={email} required
                     onChange={(e) => setEmail(e.target.value)} />
                </div>
                

                <div className='my-3'>
                    <label for="phone1">phone1</label><br />
                    <input type="text" className="form-control" value={phone1} required
                     pattern='[1-9][0-9]{9}'
                     onChange={(e) => setPhone1(e.target.value)} />
                </div>
                

                <div className='my-3'>
                    <label for="phone2">phone2</label><br />
                    <input type="text" className="form-control" value={phone2} required 
                    onChange={(e) => setPhone2(e.target.value)} />
                </div>
                

                <div className='my-3'>
                    <label for="website">website</label><br />
                    <input type="text" className="form-control" value={website} required
                    onChange={(e) => setWebsite(e.target.value)} />
                </div>
                

                <button type="submit" className="btn btn-primary">Submit</button>
                <br />

            </form>

        </div>
    );
}

export default AddHotel;