package com.hotelbookingmanagementsystem.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import io.swagger.annotations.ApiModelProperty;

public class UserDTO {
	@ApiModelProperty(value = "for holding the username")
	private String userNameField;

	@ApiModelProperty(value = "for holding the email", required = true)
	@Email
	private String userEmail;

	@ApiModelProperty(value = "for holding the password", required = true)
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should have minimum eight characters with at least one letter and one number")
	private String userPassword;

	@ApiModelProperty(value = "for holding the mobile number")
	@Pattern(regexp = "^[1-9][0-9]{9}", message = "Mobile number should be of 10 digits.")
	private String userMobile;

	@ApiModelProperty(value = "for holding the address")
	@Pattern(regexp = "[a-zA-Z0-9]+", message = "Mobile number should be of 10 digits.")
	private String userAddress;

	public UserDTO(String userNameField, @Email String userEmail,
			@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should have minimum eight characters with at least one letter and one number") String userPassword,
			@Pattern(regexp = "^[1-9][0-9]{9}", message = "Mobile number should be of 10 digits.") String userMobile,
			@Pattern(regexp = "[a-zA-Z0-9]+", message = "Mobile number should be of 10 digits.") String userAddress) {
		
		this.userNameField = userNameField;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.userMobile = userMobile;
		this.userAddress = userAddress;
	}

	public String getUserNameField() {
		return userNameField;
	}

	public void setUserNameField(String userNameField) {
		this.userNameField = userNameField;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserMobile() {
		return userMobile;
	}

	public void setUserMobile(String userMobile) {
		this.userMobile = userMobile;
	}

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	public UserDTO() {
		
	}
	

	

}
