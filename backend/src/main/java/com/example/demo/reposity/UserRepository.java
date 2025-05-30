package com.example.demo.reposity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.demo.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
	@Query("{ 'email' : ?0 }")
	Optional<User> findByEmail(String email);
	
}