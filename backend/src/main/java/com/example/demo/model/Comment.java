package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String comment;


    @DBRef
    private Tour tour;  // Reference to the tour being commented on

    @DBRef
    private User user;  // Reference to the user who made the comment

    // Constructors, getters and setters

    public Comment() {}

    public Comment(String comment,  Tour tour, User user) {
        this.comment = comment;
      
        this.tour = tour;
        this.user = user;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	

	public Tour getTour() {
		return tour;
	}

	public void setTour(Tour tour) {
		this.tour = tour;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

    // Getters and setters
}