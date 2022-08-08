class Hotel {
    hotelId = '';
    city = ''
    hotelName = ''
    description = ''
    avgRatePerDay = ''
    email = ''
    phone1 = ''
    phone2 = ''
    website = ''

    constructor(hotelId, city, hotelName, description, avgRatePerDay,
        email, phone1, website) {
        this.hotelId = hotelId;
        this.city = city
        this.hotelName = hotelName
        this.description = description
        this.avgRatePerDay = avgRatePerDay
        this.email = email
        this.phone1 = phone1
        this.website = website
    }
}

export default Hotel