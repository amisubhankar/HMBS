package com.hotelbookingmanagementsystem.model;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModelProperty;

public class BookingDTO {
	@ApiModelProperty(value = "holds the bookingId, required during updation and deletion", required = true)
	private int bookingId;
	
	@ApiModelProperty(value = "holds the hotelId", required = true)
	private int hotelId;
	
	@ApiModelProperty(value = "holds the userlId", required = true)
	private int userId;
	
	@ApiModelProperty(value = "holds the roomlId", required = true)
	private int roomId;
	
	@ApiModelProperty(value = "holds the check-in date, should be less than check-out date", required = true)
	@NotNull(message = "Kindly give the check-in date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date bookingFromDate;
	
	@ApiModelProperty(value = "holds the check-out date, should be greater than check-in date", required = true)
	@NotNull(message = "Kindly give the check-out date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date bookingToDate;
	
	@ApiModelProperty(value = "holds number of adults", required = true)
	@Min(value = 1,message = "no of adults should be minimum 1")
	private int noOfAdults;
	
	@ApiModelProperty(value = "holds number of childrens")
	private int noOfChildren;
	
	private double amount;
	
	
	public BookingDTO(int bookingId,int hotelId, int userId, int roomId, Date bookingFromDate, Date bookingToDate, int noOfAdults) {
		super();
		this.bookingId = bookingId;
		this.hotelId = hotelId;
		this.userId = userId;
		this.roomId = roomId;
		this.bookingFromDate = bookingFromDate;
		this.bookingToDate = bookingToDate;
		this.noOfAdults = noOfAdults;
	}
	
	
	public int getBookingId() {
		return bookingId;
	}


	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}


	public int getHotelId() {
		return hotelId;
	}

	public void setHotelId(int hotelId) {
		this.hotelId = hotelId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public Date getBookingFromDate() {
		return bookingFromDate;
	}

	public void setBookingFromDate(Date bookingFromDate) {
		this.bookingFromDate = bookingFromDate;
	}

	public Date getBookingToDate() {
		return bookingToDate;
	}

	public void setBookingToDate(Date bookingToDate) {
		this.bookingToDate = bookingToDate;
	}

	public int getNoOfAdults() {
		return noOfAdults;
	}

	public void setNoOfAdults(int noOfAdults) {
		this.noOfAdults = noOfAdults;
	}

	public int getNoOfChildren() {
		return noOfChildren;
	}

	public void setNoOfChildren(int noOfChildren) {
		this.noOfChildren = noOfChildren;
	}

	
	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


	@Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", hotelId=" + hotelId + ", userId=" + userId + ", roomId=" + roomId
				+ ", bookingFromDate=" + bookingFromDate + ", bookingToDate=" + bookingToDate + ", noOfAdults="
				+ noOfAdults + ", noOfChildren=" + noOfChildren + "]";
	}
	
	
}
