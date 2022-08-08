import axios from "axios";
import HotelService from "../../src/Service/hotelDetails/HotelService.js";
import Hotel from "../../src/Model/hotelDetails/Hotel.js"

describe('Tests suite for HotelService', function () {
    let service;
    let hotel;

    beforeAll(function () {
        service = new HotelService()
        hotel = new Hotel(1, 'Munnar', 'Raj Hotel', 'Fantastic view', 2000,
            'info@rajHotel.com', 1234567890, 'raj_hotel.com')
    })

    it('validTest- addHotelTest', async () => {
        spyOn(axios, "post").and.returnValue(hotel)

        const response = await service.addHotel(hotel)

        expect(response.hotelId).toEqual(hotel.hotelId)

    })

    it('validTest- deleteHotelByIdTest', async () => {
        spyOn(axios, "delete").and.returnValue(hotel.hotelId)

        const response = await service.deleteHotelById(hotel.hotelId)

        expect(response).toEqual(hotel.hotelId)
    })

    it('validTest- updateHotelTest', async () => {
        spyOn(axios, "put").and.returnValue(hotel)

        const response = await service.updateHotel(hotel)

        expect(response.hotelId).toEqual(hotel.hotelId)
    })

    it('validTest- getAllHotelTest', async () => {
        spyOn(axios, "get").and.returnValue([hotel])

        const response = await service.getAllHotel()

        expect(response.length).toEqual(1)
    })

    it('validTest- getHotelByIdTest', async () => {
        spyOn(axios, "get").and.returnValue(hotel)

        const response = await service.getHotelById(1)

        expect(response.hotelId).toEqual(hotel.hotelId)
    })
})