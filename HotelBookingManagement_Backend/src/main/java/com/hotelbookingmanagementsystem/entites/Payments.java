package com.hotelbookingmanagementsystem.entites;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Payments entity")
@Entity
public class Payments {

	@ApiModelProperty(value = "holds the payment id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id")
	private int paymentId;

	@ApiModelProperty(value = "holds the transaction details")
	@OneToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "transaction_id")
	private Transactions transaction;

	@ApiModelProperty(value = "holds the booking details")
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "booking_id")
	@JsonIgnore
	private BookingDetails bookingDetails;

	public BookingDetails getBookingDetails() {
		return bookingDetails;
	}

	public void setBookingDetails(BookingDetails bookingDetails) {
		this.bookingDetails = bookingDetails;
	}

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public Transactions getTransaction() {
		return transaction;
	}

	public void setTransaction(Transactions transaction) {
		this.transaction = transaction;
	}

	public Payments(int paymentId, Transactions transaction) {
		super();
		this.paymentId = paymentId;
		this.transaction = transaction;
	}

	public Payments() {
		
	}
	
	

}