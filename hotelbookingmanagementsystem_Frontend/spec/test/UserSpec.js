import UserService from '../../src/Service/userDetails/UserService.js'
import User from '../../src/Model/userDetails/User.js'
import axios from 'axios'

describe('Tests suite for UserManagement', function () {
    let service;
    let user;

    beforeAll(function () {
        service = new UserService()
        user = new User('1','test','test1234','test@test.com','1234554321','user','india');
    })

    it('test-addUser ', async () => {
        spyOn(axios, "post").and.returnValue(user)

        const response = await service.addUser(user)

        expect(response.userName).toEqual(user.userName)

    })

    it('test-updateUser ', async () => {


        spyOn(axios, "put").and.returnValue(user)

        const response = await service.updateUser(user)

        expect(response.userName).toEqual(user.userName)

    })

    it('test-findByUserId ', async () => {
        spyOn(axios, "get").and.returnValue(user)

        const response = await service.findUserById(user.userId)

        expect(response.userName).toEqual(user.userName)

    })

    it('test-getUserByEmail ', async () => {
        spyOn(axios, "get").and.returnValue(user)

        const response = await service.getUserByEmail(user.email)

        expect(response.userName).toEqual(user.userName)

    })

  
    
    it('test-showAllUser ', async () => {
        spyOn(axios, "get").and.returnValue([user])

        const response = await service.showAllUser()

        expect(response[0]).toEqual(user)

    })


    it('test-deleteUserById ', async () => {
        spyOn(axios, "delete").and.returnValue(null)

        const response = await service.deleteUserById(user.userId)

        expect(response).toEqual(null)

    })

    it('invalidTest - findUserById', async () => {

        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('User not found')))
        
        try {
            await service.findUserById(user.userId)
        } catch (error) {
            expect(error.message).toEqual('User not found')
        }

    })

    it('invalidTest - getUserByEmail', async () => {

        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('User not found')))
        
        try {
            await service.findUserById(user.email)
        } catch (error) {
            expect(error.message).toEqual('User not found')
        }

    })

    it('invalidTest - showAllUser', async () => {

        spyOn(axios, "get").and.returnValue(Promise.reject(new Error('User not found')))
        
        try {
            await service.showAllUser()
        } catch (error) {
            expect(error.message).toEqual('User not found')
        }

    })


    it('invalidTest - deleteUserById', async () => {

        spyOn(axios, "delete").and.returnValue(Promise.reject(new Error('User not found')))
        
        try {
            await service.deleteUserById(user.userId)
        } catch (error) {
            expect(error.message).toEqual('User not found')
        }

    })




})





