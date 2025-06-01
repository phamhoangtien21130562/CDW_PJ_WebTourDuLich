package com.example.demo.reposity;

import com.example.demo.model.Tour;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends MongoRepository<Tour, String> {
	  List<Tour> findByDeletedFalse();
}