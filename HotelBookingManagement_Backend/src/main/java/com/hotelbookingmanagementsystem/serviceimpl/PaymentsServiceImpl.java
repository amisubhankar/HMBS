package com.hotelbookingmanagementsystem.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbookingmanagementsystem.entites.Payments;
import com.hotelbookingmanagementsystem.repository.IPaymentsRepository;
import com.hotelbookingmanagementsystem.service.IPaymentsService;

@Service
public class PaymentsServiceImpl implements IPaymentsService {

	private static final Logger log = LoggerFactory.getLogger(PaymentsServiceImpl.class);

	@Autowired
	IPaymentsRepository paymentRepository;

	/**
	 * addPayments() is adding payments and saving it
	 * 
	 * @param payments : payment class object
	 * 
	 * @return payments object
	 */
	public Payments addPayments(Payments payments) {
		log.info("addPayments() is called");
		return paymentRepository.save(payments);
	}
}
