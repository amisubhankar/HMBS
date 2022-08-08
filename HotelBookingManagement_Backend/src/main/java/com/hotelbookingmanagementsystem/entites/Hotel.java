package com.hotelbookingmanagementsystem.entites;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
public class Hotel {
	@Id
	@Column(name = "hotel_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int hotelId;
	
	@NotNull(message = "Kindly give the city name")
	@Column(name = "city")
	private String city;
	
	@NotNull(message = "Kindly give the hotel name")
	@Column(name = "hotel_name")
	private String hotelName;
	
	@NotNull(message = "Kindly give the address")
	@Column(name = "address")
	private String address;
	
	@NotNull(message = "Kindly give the description")
	@Column(name = "description")
	private String description;
	
	@Min(value = 500,  message = "average rate per day should be 500")
	@NotNull(message = "Kindly give the average rate per day")
	@Column(name = "avg_rate_per_day")
	private double avgRatePerDay;
	
	@Email(message = "invalid email")
	@Column(name = "email")
	private String email;
	
	@Pattern(regexp = "^[1-9][0-9]{9}" , message = "Mobile number should be of 10 digits.")
	@Column(name = "phone1")
	private String phone1;
	
	@Pattern(regexp = "^[1-9][0-9]{9}" , message = "Mobile number should be of 10 digits.")
	@Column(name = "phone2")
	private String phone2;
	
	@Column(name = "website")
	private String website;
	
	@OneToMany(mappedBy= "hotel", cascade=CascadeType.REMOVE)
	@JsonIgnore
	private List<RoomDetails> roomDetails;
	
	@OneToMany(mappedBy ="hotel",cascade=CascadeType.REMOVE)
	@JsonIgnore
	private List<BookingDetails> bookingDetails;
	


	public List<RoomDetails> getRoomDetails() {
		return roomDetails;
	}

	public void setRoomDetails(List<RoomDetails> roomDetails) {
		this.roomDetails = roomDetails;
	}

	public List<BookingDetails> getBookingDetails() {
		return bookingDetails;
	}

	public void setBookingDetails(List<BookingDetails> bookingDetails) {
		this.bookingDetails = bookingDetails;
	}

	public Hotel() {
	}
	
	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public Hotel(int hotelId, String city, String hotelName, String address, String description, 
			double avgRatePerDay, String email, String phone1, String phone2, String website) {
		super();
		this.hotelId= hotelId;
		this.city = city;
		this.hotelName = hotelName;
		this.address = address;
		this.description = description;
		this.avgRatePerDay = avgRatePerDay;
		this.email= email;
		this.phone1= phone1;
		this.phone2= phone2;
		this.website = website;
	}
	
	
	public int getHotelId() {
		return hotelId;
	}

	public void setHotelId(int hotelId) {
		this.hotelId = hotelId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getAvgRatePerDay() {
		return avgRatePerDay;
	}

	public void setAvgRatePerDay(double avgRatePerDay) {
		this.avgRatePerDay = avgRatePerDay;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone1() {
		return phone1;
	}

	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}

	public String getPhone2() {
		return phone2;
	}

	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	@Override
	public String toString() {
		return "Hotel [hotelId=" + hotelId + ", city=" + city + ", hotel_name=" + hotelName + ", address=" + address
				+ ", description=" + description + ", avgRatePerDay=" + avgRatePerDay + ", email=" + email + ", phone1="
				+ phone1 + ", phone2=" + phone2 + ", website=" + website + "]";
	}

	
}
