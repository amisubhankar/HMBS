package com.hotelbookingmanagementsystem.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptions {

	private static final Logger log = 
			LoggerFactory.getLogger(GlobalExceptions.class);
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String,String> handleMethodArgumentInvalidException(MethodArgumentNotValidException exp){
		log.info("handleMethodArgumentInvalidException() is called");
		Map<String,String> errInfo = new HashMap<>();
		
		exp.getBindingResult().getFieldErrors()
		.forEach(err->errInfo.put(err.getField(), err.getDefaultMessage()));
		
		return errInfo;
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ConstraintViolationException.class)
	public Set<String> handleConstraintViolatedException(ConstraintViolationException exp){
		log.info("handleConstraintViolatedException() is called");
		return (exp.getConstraintViolations().stream().map(ConstraintViolation::getMessageTemplate).collect(Collectors.toSet()));
	}
	
	@ExceptionHandler(BookingDetailsNotFoundException.class)
	public ResponseEntity<String> handleInvalidBookingDetailsException(BookingDetailsNotFoundException exp){
		log.info("handleInvalidBookingDetailsException() is called");
		return new ResponseEntity<>(exp.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(FromDateisAfterToDateException.class)
	public ResponseEntity<String> handleFromDateIsAfterToDateException(FromDateisAfterToDateException exp){
		log.info("handleFromDateIsAfterToDateException() is called");
		return new ResponseEntity<>(exp.getMessage(), HttpStatus.BAD_REQUEST);
	}
		
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleInvalidUserDetails(UserNotFoundException exp){
		log.info("handleInvalidUserDetails() is called");
		return new ResponseEntity<>(exp.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(PaymentsNotFoundException.class)
	public ResponseEntity<String> handleInvalidPaymentDetails(PaymentsNotFoundException exp){
		log.info("handleInvalidPaymentDetails() is called");
		return new ResponseEntity<>(exp.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(HotelNotFoundException.class)
	public ResponseEntity<String> handleInvalidHotelDetails(HotelNotFoundException exp){
		log.info("handleInvalidHotelDetails() is called");
		return new ResponseEntity<>(exp.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(RoomDetailsNotFoundException.class)
	public ResponseEntity<String> handleInvalidRoomDetails(RoomDetailsNotFoundException exp){
		log.info("handleInvalidRoomDetails() is called");
		return new ResponseEntity<>(exp.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidDateFormatException.class)
	public ResponseEntity<String> handleInvalidDateFormat(InvalidDateFormatException exp){
		log.info("handleInvalidDateFormat() is called");
		return new ResponseEntity<>(exp.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	
}
