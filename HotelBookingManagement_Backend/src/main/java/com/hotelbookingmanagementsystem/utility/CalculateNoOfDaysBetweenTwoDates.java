package com.hotelbookingmanagementsystem.utility;

import java.util.Date;

import com.hotelbookingmanagementsystem.exception.InvalidDateFormatException;

public class CalculateNoOfDaysBetweenTwoDates {
	private CalculateNoOfDaysBetweenTwoDates() {
		
	}
	
	public static int calculate(Date fromDate, Date toDate) throws InvalidDateFormatException {

		try {
			long noOfDays = Math.abs(fromDate.getTime() - toDate.getTime()) / (1000l * 60 * 60 * 24);
			return (int)(noOfDays==0?1:noOfDays);
		} catch (Exception e) {
			throw new InvalidDateFormatException("Please enter date in correct format [yyyy-MM-dd]");
		}
	}
}
