package com.example.demo.model;

public class OrderStatsDTO {
    private long totalOrders;

    public OrderStatsDTO(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }
}