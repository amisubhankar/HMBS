package com.hotelbookingmanagementsystem.entites;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "User entity")
@Entity(name = "users")
public class User {

	@ApiModelProperty(value = "holds the user id")
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	private int userId;

	@ApiModelProperty(value = "holds the user name")
	@Column(name = "user_name")
	@NotBlank(message = "User Name cannot be blank")
	@Pattern(regexp = "[A-Za-z ]+", message = "User_name can only contains alphabates")
	private String userName;

	@ApiModelProperty(value = "holds the user email")
	@Email(message = "Not a valid email")
	private String email;

	@ApiModelProperty(value = "holds the user password")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should have minimum eight characters with at least one letter and one number")
	private String password;

	@ApiModelProperty(value = "holds the user role")
	@NotBlank(message = "Role cannot be blank")
	private String role;

	@ApiModelProperty(value = "holds the user mobile number")
	@Pattern(regexp = "^[1-9][0-9]{9}", message = "Mobile number should be of 10 digits.")
	private String mobile;

	@ApiModelProperty(value = "holds the user address")
	@NotNull(message = "Address cannot be blank")
	private String address;

	@ApiModelProperty(value = "holds the booking details")
	@OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private BookingDetails bookingDetails;

	public BookingDetails getBookingDetails() {
		return bookingDetails;
	}

	public void setBookingDetails(BookingDetails bookingDetails) {
		this.bookingDetails = bookingDetails;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public User(int userId, @NotBlank(message = "User Name cannot be blank") String userName,
			@Email(message = "Not a valid email") String email, @Pattern(regexp = "[a-zA-Z0-9*_-]{8},") String password,
			@NotBlank(message = "Role cannot be blank") String role, @Pattern(regexp = "^[1-9][0-9]{9}") String mobile,
			@NotBlank(message = "Address cannot be blank") String address) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.mobile = mobile;
		this.address = address;
	}

	public User() {

	}


}
