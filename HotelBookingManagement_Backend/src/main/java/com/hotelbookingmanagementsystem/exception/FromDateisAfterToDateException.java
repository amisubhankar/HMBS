package com.hotelbookingmanagementsystem.exception;

public class FromDateisAfterToDateException extends Exception {
	public FromDateisAfterToDateException(String message) {
		super(message);
	}
}
