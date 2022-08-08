import RoomDetailsService from "../../src/Service/roomDetails/RoomDetailsService.js";
import RoomDetails from "../../src/Model/roomDetails/RoomDetails.js"
import axios from 'axios'

describe('Tests suite for BookingService', function () {
    let service;
    let roomDetails;
    let roomDetailsOne;
    let allRooms = []
    beforeAll(function () {
        service = new RoomDetailsService()
        roomDetails = new RoomDetails(3, '103', 'super deluxe', 2, '1800', [1, 2],
            'true')
        roomDetailsOne = new RoomDetails(2, '104', 'super deluxe', 4, '1800', [1, 2],
            'true')
        allRooms.push(roomDetails)
        allRooms.push(roomDetailsOne)
    })


    it('test- updateRoomDetailsValidTest', async () => {
        spyOn(axios, "put").and.returnValue(roomDetails)
        const response = await service.updateRoomDetails(roomDetails)
        expect(response.roomId).toEqual(roomDetails.roomId)
    })


    it('invalidTest - updateRoomDetailsInvalidTest', async () => {
        spyOn(axios, "put").and.returnValue(Promise.reject(new Error('Room Details Not Found')))
        // console.log(roomDetails.roomId)
        try {
            await service.updateRoomDetails(roomDetails)
        } catch (error) {
            expect(error.message).toEqual('Room Details Not Found')
        }

    })

    it('test - getAllRoomDetailsTest', async () =>{
        spyOn(axios,"get").and.returnValue(allRooms)
        const response = await service.getAllRoomDetails()
        expect(response).toEqual(allRooms)
    })

    it('test - getRoomDetailsById', async ()=>{
        spyOn(axios,"get").and.returnValue(roomDetails)
        const response = await service.getRoomDetails(roomDetails.roomId)
        expect(response).toEqual(roomDetails)
        // console.log(response)
    })

    it('invalidTest - getAllRoomDetailsByIdInvalidTest', async () => {

        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('Room Details Not Found')))
        
        try {
            await service.getRoomDetails(roomDetails.roomId)
        } catch (error) {
            expect(error.message).toEqual('Room Details Not Found')
        }

    })

    it('test- addRoomDetailsValidTest', async () => {
        spyOn(axios, "post").and.returnValue(roomDetails)
        const response = await service.addRoomDetails(roomDetails)
        expect(response.roomId).toEqual(roomDetails.roomId)
    })

    it('test- deleteRoomDetailsValidTest', async () => {
        spyOn(axios, "delete").and.returnValue(roomDetails)
        const response = await service.deleteRoomDetails(roomDetails.roomId)
        // console.log(response)
        expect(response.roomId).toEqual(roomDetails.roomId)
    })

    it('invalidTest - deleteRoomDetailsInvalidTest', async () => {
        spyOn(axios, "delete").and.returnValue(Promise.reject(new Error('Room Deleted Successfully')))
        try {
            await service.deleteRoomDetails(roomDetails.roomId)
        } catch (error) {
            expect(error.message).toEqual('Room Deleted Successfully')
        }
    })


})