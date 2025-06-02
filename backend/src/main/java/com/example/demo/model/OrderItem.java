package com.example.demo.model;

import lombok.Data;

@Data
public class OrderItem {
    private String tourId;       // ID của tour
    private String tourName;    // Tên tour
    private int quantity;
    private double price;
}
