package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.OrderStatsDTO;
import com.example.demo.model.OrderStatus;
import com.example.demo.reposity.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        order.setOrderDate(Instant.now());
        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable String id) {
        Optional<Order> opt = orderRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Order order = opt.get();
        order.setStatus((OrderStatus.CANCELLED));
        orderRepository.save(order);
        return ResponseEntity.ok("Đã huỷ đơn hàng.");
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeOrder(@PathVariable String id) {
        Optional<Order> opt = orderRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Order order = opt.get();
        order.setStatus((OrderStatus.COMPLETED));
        orderRepository.save(order);
        return ResponseEntity.ok("Đơn hàng đã hoàn tất.");
    }
    @GetMapping("/stats")
    public ResponseEntity<OrderStatsDTO> getOrderStats() {
        long total = orderRepository.count(); // đếm tất cả đơn hàng
        return ResponseEntity.ok(new OrderStatsDTO(total));
    }
}
