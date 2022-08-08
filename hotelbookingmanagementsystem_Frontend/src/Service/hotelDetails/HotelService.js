import axios from 'axios'


class HotelService{
    url = 'http://localhost:8081/hbms/'

    getAllHotel(){
        return axios.get(this.url+'user/hotel')
    }

    deleteHotelById(hotelId){
        return axios.delete(this.url+'admin/hotel/'+hotelId)
    }

    addHotel(hotel){
        return axios.post(this.url + 'admin/hotel',hotel)
    }

    getHotelById(hotelId){
        return axios.get(this.url+'admin/hotel/'+hotelId)
    }

    updateHotel(hotel){
        return axios.put(this.url+'admin/hotel',hotel)
    }
}

export default HotelService