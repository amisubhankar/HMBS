import axios from 'axios'

class BookingDetailsService{
    baseUrl = 'http://localhost:8081/hbms/'
    
    getAllBookingDetails(){
        return axios.get(this.baseUrl+'admin/booking')
    }

    deleteBookingDetailById(bookingId){
        return axios.delete(this.baseUrl+'admin/booking/'+bookingId)
    }

    addBookingDetails(bookingDetails){
        return axios.post(this.baseUrl+'user/bookhotel',bookingDetails)
    }

    updateBookingDetails(bookingDetails){
        return axios.put(this.baseUrl+'admin/booking', bookingDetails)
    }

    getBookingDetailsById(bookingId){
        return axios.get(this.baseUrl+'admin/booking/'+bookingId)
    }

    getBookingDetailByUserId(userId){
        return axios.get(this.baseUrl+'user/getbooking/'+userId)
    }
}

export default BookingDetailsService