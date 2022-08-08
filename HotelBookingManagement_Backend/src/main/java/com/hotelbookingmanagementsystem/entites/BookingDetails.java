package com.hotelbookingmanagementsystem.entites;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Booking Details entity")
@Entity
public class BookingDetails {
	
	@ApiModelProperty(value = "holds the booking id")
	@Id
	@Column(name = "booking_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int bookingId;
	
	@ApiModelProperty(value = "holds the check-in date, should be less than check-out date", required = true)
	@NotNull(message = "Kindly give the check-in date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "booked_from")
	private Date bookedFrom;
	
	@ApiModelProperty(value = "holds the check-out date, should be greater than check-in date", required = true)
	@NotNull(message = "Kindly give the check-out date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "booked_to")
	private Date bookedTo;
	
	@ApiModelProperty(value = "number of adults", required = true)
	@Min(value = 1,message = "no of adults should be minimum 1")
	@Column(name = "no_of_adults")
	private int noOfAdults;
	
	@ApiModelProperty(value = "number of children")
	@Column(name = "no_of_children")
	private int noOfChildren;
	
	@ApiModelProperty(value = "Amount for booking", required = true)
	@NotNull(message = "Kindly enter the amount")
	@Min(value = 100,message = "Amount should be minimum 100")
	@Column(name = "amount")
	private double amount;
	
	@ApiModelProperty(value = "holds user details", required = true)
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ApiModelProperty(value = "holds hotel details", required = true)
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "hotel_id")
	private Hotel hotel;
	
	@ApiModelProperty(value = "holds the list of payment details", required = true)
	@OneToMany(mappedBy = "bookingDetails", cascade = CascadeType.ALL)
	private List<Payments> payment;
	
	@ApiModelProperty(value = "holds the list of room details", required = true)
	@OneToMany
	@JoinTable(
			name = "Bookingdetails_Roomdetails",
			joinColumns = {@JoinColumn(name = "booking_id")},
			inverseJoinColumns = {@JoinColumn(name = "room_id")}
			)
	private List<RoomDetails> roomDetails;
	
	
	public BookingDetails() {
	}
	
	public BookingDetails(int bookingId, Date bookedFrom, Date bookedTo, int noOfAdults, int noOfChildren,
			double amount) {
		super();
		this.bookingId = bookingId;
		this.bookedFrom = bookedFrom;
		this.bookedTo = bookedTo;
		this.noOfAdults = noOfAdults;
		this.noOfChildren = noOfChildren;
		this.amount = amount;

	}
	
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}
	public Date getBookedFrom() {
		return bookedFrom;
	}
	public void setBookedFrom(Date bookedFrom) {
		this.bookedFrom = bookedFrom;
	}
	public Date getBookedTo() {
		return bookedTo;
	}
	public void setBookedTo(Date bookedTo) {
		this.bookedTo = bookedTo;
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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Hotel getHotel() {
		return hotel;
	}
	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	public List<Payments> getPayment() {
		return payment;
	}
	public void setPayment(List<Payments> payment) {
		this.payment = payment;
	}

	public List<RoomDetails> getRoomDetails() {
		return roomDetails;
	}

	public void setRoomDetails(List<RoomDetails> roomDetails) {
		this.roomDetails = roomDetails;
	}

	@Override
	public String toString() {
		return "BookingDetails [bookingId=" + bookingId + ", bookedFrom=" + bookedFrom + ", bookedTo=" + bookedTo
				+ ", noOfAdults=" + noOfAdults + ", noOfChildren=" + noOfChildren + ", amount=" + amount + ", user="
				+ user + ", hotel=" + hotel + ", payment=" + payment + ", roomDetails=" + roomDetails + "]";
	}
	
}
