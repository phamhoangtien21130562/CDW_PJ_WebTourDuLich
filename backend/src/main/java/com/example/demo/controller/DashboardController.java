package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.DashboardStatsDTO; // ⬅ Đã đổi tên ở đây
import com.example.demo.reposity.OrderRepository;
import com.example.demo.reposity.TourRepository;
import com.example.demo.reposity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStatistics() {
        long totalUsers = userRepository.count();
        long totalTours = tourRepository.count();
        long totalOrders = orderRepository.count();

        List<Order> orders = orderRepository.findAll();

        double totalRevenueDouble = orders.stream()
                .filter(order -> order.getStatus() != null && order.getStatus().name().equals("COMPLETED"))
                .mapToDouble(Order::getTotalAmount)
                .sum();

        BigDecimal totalRevenue = BigDecimal.valueOf(totalRevenueDouble);


        DashboardStatsDTO statsDTO = new DashboardStatsDTO(totalUsers, totalTours, totalOrders, totalRevenue);

        return ResponseEntity.ok(statsDTO);
    }
}
