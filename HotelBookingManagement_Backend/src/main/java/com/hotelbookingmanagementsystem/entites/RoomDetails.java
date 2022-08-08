package com.hotelbookingmanagementsystem.entites;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "roomdetails")
@ApiModel(description = "Room Details")
public class RoomDetails {

	@Id
	@Column(name = "room_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(notes = "Unique Id For Room")
	private int roomId;

	@ApiModelProperty(notes = "Room Number")
	@NotNull(message = "Room Number Cannot Be Empty")
	@Column(name = "room_no")
	private String roomNo;

	@ApiModelProperty(notes = "Type Of Room")
	@Column(name = "room_type")
	private String roomType;

	@ApiModelProperty(notes = "Rate of room per day")
	@NotNull(message = "Rate Cannot Be Empty")
	@Column(name = "rate_per_day")
	private double ratePerDay;

	@ApiModelProperty(notes = "Is Room Available or not")
	@NotNull(message = "Availability Cannot be null")
	@Column(name = "is_available")
	private boolean isAvailable;

	@Lob
	@Type(type = "org.hibernate.type.BinaryType")
	@Column(name = "photo")
	private byte[] photo;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "hotel_id")
	@JsonIgnore
	private Hotel hotel;
	
	@Transient
	private int hotelId;

	public RoomDetails() {

	}

	public RoomDetails(int roomId, String roomNo, String roomType, double ratePerDay, boolean isAvailable) {
		super();
		this.roomId = roomId;
		this.roomNo = roomNo;
		this.roomType = roomType;
		this.ratePerDay = ratePerDay;
		this.isAvailable = isAvailable;
	}
	
	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public int getRoomId() {
		return roomId;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public String getRoomNo() {
		return roomNo;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public double getRatePerDay() {
		return ratePerDay;
	}

	public void setRatePerDay(double ratePerDay) {
		this.ratePerDay = ratePerDay;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public int getHotelId() {
		return hotelId;
	}

	public void setHotelId(int hotelId) {
		this.hotelId = hotelId;
	}
	
	
}
