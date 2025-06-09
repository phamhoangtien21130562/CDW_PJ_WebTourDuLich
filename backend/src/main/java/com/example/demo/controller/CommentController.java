package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.CommentRequest;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")  // Allow front-end to connect from localhost
@RestController
@RequestMapping("/api/tours")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Endpoint to get all comments for a tour
    @GetMapping("/{tourId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String tourId) {
        List<Comment> comments = commentService.getCommentsByTourId(tourId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping("/{tourId}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable String tourId,  // Get the tourId from the URL
            @RequestBody CommentRequest commentRequest) {  // Receive the CommentRequest DTO

        // Check if tourId from the URL matches tourId in the body
        if (!tourId.equals(commentRequest.getTourId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // Ensure that userId and comment are not null or empty
        if (commentRequest.getUserId() == null || commentRequest.getUserId().isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Comment comment = commentService.addComment(commentRequest, commentRequest.getUserId());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }
}