package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "orders")
public class Order {

    @Id
    @JsonProperty("id") // to show as "id" instead of "_id"
    private String id;

    @DBRef
    private Tour tour;  // Reference to the tour being commented on

    @DBRef
    private User user;  // Reference to the user who made the order

    private String customerName;
    private String customerEmail;
    private double totalAmount;
    private Instant orderDate;
    private OrderStatus status = OrderStatus.PENDING;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

	@Override
	public String toString() {
		return "Order [id=" + id + ", tour=" + tour + ", user=" + user + ", customerName=" + customerName
				+ ", customerEmail=" + customerEmail + ", totalAmount=" + totalAmount + ", orderDate=" + orderDate
				+ ", status=" + status + "]";
	}
    
}
