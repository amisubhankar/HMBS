package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.hotelbookingmanagementsystem.entites.Transactions;
import com.hotelbookingmanagementsystem.repository.ITransactionsRepository;
import com.hotelbookingmanagementsystem.service.ITransactionsService;

@RunWith(SpringRunner.class)
@SpringBootTest
class TransactionsServiceImplTest {

	@MockBean
	ITransactionsRepository transactionRepository;
	
	@Autowired
	ITransactionsService transactionService;
	
	@Test
	void testValidAddTransaction() {
		Transactions transaction = new Transactions(2, 2000);
		when(transactionRepository.save(transaction)).thenReturn(transaction);
		
		assertEquals(transaction,transactionService.addTransaction(transaction));
	}

}
