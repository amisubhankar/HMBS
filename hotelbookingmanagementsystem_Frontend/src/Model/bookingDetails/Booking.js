class Booking{
    bookingId = ''
    hotelId = ''
    userId = ''
    roomId = ''
    bookingFromDate = ''
    bookingToDate = ''
    noOfAdults = ''
    noOfChildren = ''
    amount = ''

    constructor(bookingId, hotelId, userId, roomId, bookingFromDate, bookingToDate, noOfAdults, noOfChildren, amount) {
      this.bookingId = bookingId;
      this.hotelId = hotelId;
      this.userId = userId;
      this.roomId = roomId;
      this.bookingFromDate = bookingFromDate;
      this.bookingToDate = bookingToDate;
      this.noOfAdults = noOfAdults;
      this.noOfChildren = noOfChildren;
      this.amount = amount
    }
    
}

export default Booking