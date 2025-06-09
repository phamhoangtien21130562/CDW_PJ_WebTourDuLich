package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.model.CommentRequest;
import com.example.demo.model.Tour;
import com.example.demo.model.User;
import com.example.demo.reposity.CommentRepository;
import com.example.demo.reposity.TourRepository;
import com.example.demo.reposity.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    public Comment addComment(CommentRequest commentRequest, String userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        // Find tour by ID from the request
        Tour tour = tourRepository.findById(commentRequest.getTourId()).orElseThrow(() -> {
            System.out.println("Tour not found with ID: " + commentRequest.getTourId()); // Log error
            return new IllegalArgumentException("Tour not found");
        });

        // Find user by ID
        User user = userRepository.findById(userId).orElseThrow(() -> {
            System.out.println("User not found with ID: " + userId); // Log error
            return new IllegalArgumentException("User not found");
        });

        // Create and save comment
        Comment comment = new Comment(commentRequest.getComment(), tour, user);
        return commentRepository.save(comment);
    }

    // Method to get all comments for a tour
    public List<Comment> getCommentsByTourId(String tourId) {
        return commentRepository.findByTourId(tourId);
    }
}