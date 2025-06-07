package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "carts")
public class Cart {

    @Id
    private String id;                  // ID của giỏ hàng
    private Double totalPrice;          // Tổng giá trị của giỏ hàng
    private Integer numberOfGuests;     // Số lượng khách tham gia tour

    @DBRef
    private Tour tour;                 // Tham chiếu đến đối tượng Tour
    @DBRef
    private User user;                 // Tham chiếu đến đối tượng User

    
    public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public Double getTotalPrice() {
		return totalPrice;
	}


	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}


	public Integer getNumberOfGuests() {
		return numberOfGuests;
	}


	public void setNumberOfGuests(Integer numberOfGuests) {
		this.numberOfGuests = numberOfGuests;
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


	public void calculateTotalPrice() {
        if (tour != null && numberOfGuests != null) {
            this.totalPrice = tour.getPrice() * numberOfGuests;
        }
    }
}