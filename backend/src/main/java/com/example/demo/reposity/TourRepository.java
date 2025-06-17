package com.example.demo.reposity;

import com.example.demo.model.Tour;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends MongoRepository<Tour, String> {
	  List<Tour> findByDeletedFalse();
	  public List<Tour> findByTitleContainingIgnoreCaseAndDeletedFalse(String title);
	  public List<Tour> findByDepartureContainingIgnoreCaseAndDeletedFalse(String departure);
	  public List<Tour> findByStartDateContainingIgnoreCaseAndDeletedFalse(String startDate);
	  public List<Tour> findByTitleContainingIgnoreCaseAndDepartureContainingIgnoreCaseAndDeletedFalse(String title, String departure);
	  public List<Tour> findByTitleContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(String title, String startDate);
	  public List<Tour> findByDepartureContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(String departure, String startDate);
	  public List<Tour> findByTitleContainingIgnoreCaseAndDepartureContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(String title, String departure, String startDate);
	  List<Tour> findByCategoryIdAndDeletedFalse(String categoryId);
}