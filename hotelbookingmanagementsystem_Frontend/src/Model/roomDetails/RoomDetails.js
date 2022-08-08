class RoomDetails {
  roomId = ''
  roomNo = ''
  roomType = ''
  ratePerDay = ''
  isAvailable = ''
  photo = ''
  hotelId = ''
  
  constructor(roomId, roomNo, roomType, ratePerDay, isAvailable, photo, hotelId) {
    this.roomId = roomId;
    this.roomNo = roomNo;
    this.roomType = roomType;
    this.ratePerDay = ratePerDay;
    this.isAvailable = isAvailable;
    this.photo = photo;
    this.hotelId = hotelId;
  }

}

export default RoomDetails