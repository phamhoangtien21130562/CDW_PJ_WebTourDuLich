package com.example.demo.model;

import java.math.BigDecimal;

public class DashboardStatsDTO {
    private long totalUsers;
    private long totalTours;
    private long totalOrders;
    private BigDecimal totalRevenue;

    public DashboardStatsDTO(long totalUsers, long totalTours, long totalOrders, BigDecimal totalRevenue) {
        this.totalUsers = totalUsers;
        this.totalTours = totalTours;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalTours() {
        return totalTours;
    }

    public void setTotalTours(long totalTours) {
        this.totalTours = totalTours;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
