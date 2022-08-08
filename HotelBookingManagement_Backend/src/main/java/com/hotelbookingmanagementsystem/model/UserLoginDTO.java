package com.hotelbookingmanagementsystem.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import io.swagger.annotations.ApiModelProperty;

public class UserLoginDTO {
	@ApiModelProperty(value = "for holding the email", required = true)
	@Email
	private String email;

	@ApiModelProperty(value = "for holding the password", required = true)
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should have minimum eight characters with at least one letter and one number")
	private String password;

	public UserLoginDTO(@Email String email,
			@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should have minimum eight characters with at least one letter and one number") String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public UserLoginDTO() {
		super();

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

}
