package com.example.demo.reposity;

import com.example.demo.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByTourId(String tourId); // Fetch all comments for a specific tour
}