import axios from 'axios';

class RoomDetailsService{

    getAllRoomDetails(){
        return axios.get('http://localhost:8081/hbms/admin/room');
    }

    deleteRoomDetails(roomId){
        return axios.delete('http://localhost:8081/hbms/admin/room/'+roomId)
    }

    addRoomDetails(roomDetails){
        return axios.post('http://localhost:8081/hbms/admin/room',roomDetails)
    }

    updateRoomDetails(roomDetails){
        return axios.put('http://localhost:8081/hbms/admin/room',roomDetails)
    }

    getRoomDetails(roomId){
        return axios.get('http://localhost:8081/hbms/admin/room/'+roomId)
    }

    getRoomByHotelId(hotelId){
        return axios.get('http://localhost:8081/hbms/user/allhotel/'+hotelId)
    }

    getAvailableRoomByhotelId(hotelId){
        return axios.get('http://localhost:8081/hbms/user/hotel/'+hotelId)
    }
}

export default RoomDetailsService;