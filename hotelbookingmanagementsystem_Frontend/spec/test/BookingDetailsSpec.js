import BookingDetailsService from "../../src/Service/bookingDetails/BookingDetailsService.js";
import Booking from "../../src/Model/bookingDetails/Booking.js"
import axios from 'axios'

describe('Tests suite for BookingService', function () {
    let service;
    let booking;

    beforeAll(function () {
        service = new BookingDetailsService()
        booking = new Booking('1', '2', '3', '101', '2022-01-12',
            '2022-01-14', 2, 0, 3000)
    })

    it('validTest- addBookingvalidTest', async () => {
        spyOn(axios, "post").and.returnValue(booking)

        const response = await service.addBookingDetails(booking)

        expect(response.bookingId).toEqual(booking.bookingId)
    })

    it('validTest - deleteBookingTest', async () => {
        spyOn(axios, "delete").and.returnValue(booking.bookingId)

        const response = await service.deleteBookingDetailById(booking.bookingId)

        expect(response).toEqual(booking.bookingId)
    })

    it('invalidTest - deleteBookingTest', async () => {
        spyOn(axios, "delete").and.returnValue(Promise.reject(new Error('Booking not found')))

        try {
            await service.deleteBookingDetailById(booking.bookingId)
        } catch (error) {
            expect(error.message).toEqual('Booking not found')
        }
    })

    it('validTest - updateBookingTest', async () => {
        spyOn(axios, "put").and.returnValue(booking)

        const response = await service.updateBookingDetails(booking)

        expect(response.bookingId).toEqual(booking.bookingId)
    })

    it('invalidTest - updateBookingTest', async () => {
        spyOn(axios, "put").and.returnValue(Promise.reject(new Error('Booking not found')))

        try {
            await service.updateBookingDetails(booking)
        } catch (error) {
            expect(error.message).toEqual('Booking not found')
        }
    })

    it('validTest - getBookingDetailsTest', async () => {
        spyOn(axios, "get").and.returnValue([booking])

        const response = await service.getAllBookingDetails()

        expect(response.length).toEqual(1)
    })

    it('invalidTest - getBookingDetailsTest', async () => {
        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('No Booking found')))

        try {
            await service.getAllBookingDetails()
        } catch (error) {
            expect(error.message).toEqual('No Booking found')
        }
    })

    it('validTest - getBookingDetailsByIdTest', async () => {
        spyOn(axios, "get").and.returnValue(booking)

        const response = await service.getBookingDetailsById(booking.bookingId)

        expect(response.bookingId).toEqual(booking.bookingId)
    })

    it('invalidTest - getBookingDetailsByIdTest', async () => {
        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('Booking not found')))

        try {
            await service.getBookingDetailsById(booking.bookingId)
        } catch (error) {
            expect(error.message).toEqual('Booking not found')
        }
    })

    it('validTest - getBookingDetailByUserIdTest', async () => {
        spyOn(axios, "get").and.returnValue(booking)

        const response = await service.getBookingDetailByUserId(booking.userId)

        expect(response.bookingId).toEqual(booking.bookingId)
    })

    it('invalidTest - getBookingDetailByUserIdTest', async () => {

        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('User not found')))

        try {
            await service.getBookingDetailByUserId(booking.userId)
        } catch (error) {
            expect(error.message).toEqual('User not found')
        }

    })


})