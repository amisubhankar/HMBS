package com.hotelbookingmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelbookingmanagementsystem.entites.Transactions;

@Repository
public interface ITransactionsRepository extends JpaRepository<Transactions, Integer>{

}
