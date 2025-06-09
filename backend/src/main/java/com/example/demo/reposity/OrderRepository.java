package com.example.demo.reposity;

import com.example.demo.model.Order;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
	 List<Order> findByUserId(String userId);
}
