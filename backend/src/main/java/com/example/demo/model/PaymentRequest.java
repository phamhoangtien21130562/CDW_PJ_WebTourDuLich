package com.example.demo.model;

import java.util.List;

public class PaymentRequest {
    private List<Order> orders;
    private String transactionId;
    private String paymentMethod;
    private double paymentAmount;
    private String currency;
    private String bankCode;  // Added bankCode field
    private String userId; // Added userId field
    // Getters and setters
    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getBankCode() {
        return bankCode;  // Getter for bankCode
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;  // Setter for bankCode
    }
}
