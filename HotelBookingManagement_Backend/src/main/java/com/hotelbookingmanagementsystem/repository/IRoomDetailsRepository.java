package com.hotelbookingmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hotelbookingmanagementsystem.entites.RoomDetails;

@Repository
public interface IRoomDetailsRepository extends JpaRepository<RoomDetails, Integer> {
	
	@Query(value = "select * from Roomdetails where hotel_id = ?1 and is_available = true", nativeQuery = true)
	public List<RoomDetails> findRoomByHotelId(int hotelId);
	
	@Query(value = "select * from Roomdetails where hotel_id = ?1", nativeQuery = true)
	public List<RoomDetails> findAllRoomByHotelId(int hotelId);
	
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update RoomDetails r set r.isAvailable = :status where r.roomId = :roomId")
	public void makeRoomUnavailable(@Param("status") boolean status,@Param("roomId") int roomId);
	
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update RoomDetails r set r.isAvailable = :status where r.roomId = :roomId")
	public void makeRoomavailable(@Param("status") boolean status,@Param("roomId") int roomId);
	
	@Query(value = "select room_id from bookingdetails_roomdetails where booking_id = ?1", nativeQuery = true)
	public int getRoomIdByBookingId(int bookingId);
	
	@Query(value = "select rate_per_day from roomdetails where room_id = ?1", nativeQuery = true)
	public int getRoomFareByRoomId(int roomId);
	
	@Transactional
	@Modifying
	@Query(value = "delete from bookingdetails_roomdetails where room_id = ?1", nativeQuery = true)
	public void deleteFromReferenceTable(int roomId);
}
