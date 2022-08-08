package com.hotelbookingmanagementsystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.exception.RoomDetailsNotFoundException;

@Service
public interface IRoomDetailsService {

	public String addRoomDetails(RoomDetails roomDetails) throws HotelNotFoundException;
	public String updateRoomDetails(RoomDetails roomDetails) throws RoomDetailsNotFoundException, HotelNotFoundException;
	public String removeRoomDetails(int roomId) throws RoomDetailsNotFoundException ;
	public List<RoomDetails> showAllRoomDetails();
	public RoomDetails showRoomDetails(int roomDetailsId) throws RoomDetailsNotFoundException ;
	public List<RoomDetails> getRoomsByHotelId(int hotelId) throws HotelNotFoundException, RoomDetailsNotFoundException;
	public List<RoomDetails> getAllRoomsByHotelId(int hotelId) throws HotelNotFoundException, RoomDetailsNotFoundException;
}
