package com.hotelbookingmanagementsystem.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbookingmanagementsystem.entites.Transactions;
import com.hotelbookingmanagementsystem.repository.ITransactionsRepository;
import com.hotelbookingmanagementsystem.service.ITransactionsService;

@Service
public class TransactionsServiceImpl implements ITransactionsService{

	private static final Logger log = 
			LoggerFactory.getLogger(TransactionsServiceImpl.class);
	
	@Autowired
	ITransactionsRepository transactionsRepository;
	
	/**
	 * addTransaction() is adding transaction and saving them
	 * 
	 * @param transaction : Transaction class object
	 * 
	 * @return transaction object
	 */
	@Override
	public Transactions addTransaction(Transactions transaction) {
		log.info("addTransaction() is called");
		return transactionsRepository.save(transaction);
	}

}
