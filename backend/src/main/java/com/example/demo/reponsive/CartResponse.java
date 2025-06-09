package com.example.demo.reponsive;

public class CartResponse {
    private String cartId;
    private String tourTitle;
    private Double tourPrice;
    private Integer numberOfGuests;
    private String userFullName;
    private String userEmail;
    private String userId;   // Added userId
    private String tourId;   // Added tourId

    public CartResponse(String cartId, String tourTitle, Double tourPrice, Integer numberOfGuests, 
                        String userFullName, String userEmail, String userId, String tourId) {
        this.cartId = cartId;
        this.tourTitle = tourTitle;
        this.tourPrice = tourPrice;
        this.numberOfGuests = numberOfGuests;
        this.userFullName = userFullName;
        this.userEmail = userEmail;
        this.userId = userId;  // Initialize userId
        this.tourId = tourId;  // Initialize tourId
    }

    // Getters and Setters
    public String getCartId() { return cartId; }
    public void setCartId(String cartId) { this.cartId = cartId; }

    public String getTourTitle() { return tourTitle; }
    public void setTourTitle(String tourTitle) { this.tourTitle = tourTitle; }

    public Double getTourPrice() { return tourPrice; }
    public void setTourPrice(Double tourPrice) { this.tourPrice = tourPrice; }

    public Integer getNumberOfGuests() { return numberOfGuests; }
    public void setNumberOfGuests(Integer numberOfGuests) { this.numberOfGuests = numberOfGuests; }

    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserId() { return userId; }  // Getter for userId
    public void setUserId(String userId) { this.userId = userId; }  // Setter for userId

    public String getTourId() { return tourId; }  // Getter for tourId
    public void setTourId(String tourId) { this.tourId = tourId; }  // Setter for tourId
}
