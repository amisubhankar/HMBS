package com.hotelbookingmanagementsystem.entites;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value = "Entity for transactions")
@Entity
@Table(name = "transactions")
public class Transactions {

	@ApiModelProperty(value = "holds transaction id")
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "transaction_id")
	private int transactionId;
	
	@ApiModelProperty(value = "holds the transactiuon amount", required = true)
	@NotNull(message = "Kindly enter the amount")
	@Min(value = 1000, message = "Amount should be minimum 1000")
	@Column(name = "amount")
	private double amount;
	
	@ApiModelProperty(value = "holds the payments details")
	@OneToOne(mappedBy = "transaction")
	@JsonIgnore
	private Payments payment;
	
	public Transactions() {
	}

	public Transactions(int transactionId, double amount) {
		super();
		this.transactionId = transactionId;
		this.amount = amount;
	}
	
	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	
	public Payments getPayment() {
		return payment;
	}

	public void setPayment(Payments payment) {
		this.payment = payment;
	}

	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", amount=" + amount + "]";
	}

}
