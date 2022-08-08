package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.hotelbookingmanagementsystem.entites.Payments;
import com.hotelbookingmanagementsystem.entites.Transactions;
import com.hotelbookingmanagementsystem.repository.IPaymentsRepository;
import com.hotelbookingmanagementsystem.service.IPaymentsService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PaymentsServiceImplTest {

	@MockBean
	IPaymentsRepository paymentsRepository;

	@Autowired
	IPaymentsService paymentsService;

	static Payments payment;
	static Transactions transaction;

	@BeforeAll
	public static void initPayment() {
		transaction = new Transactions(2, 2000.0);
		payment = new Payments(1, transaction);
	}

	@Test
	 void testValidPayment() {
		when(paymentsRepository.save(payment)).thenReturn(payment);
		assertEquals(payment, paymentsService.addPayments(payment));

	}

	@AfterAll
	public static void tearDownPayment() {
		payment = null;
	}

}
