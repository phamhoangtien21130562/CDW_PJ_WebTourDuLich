package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.Order;

import com.example.demo.model.OrderStatus;
import com.example.demo.model.PaymentRequest;
import com.example.demo.model.Payments;
import com.example.demo.model.Tour;
import com.example.demo.model.User;
import com.example.demo.reposity.OrderRepository;
import com.example.demo.reposity.TourRepository;
import com.example.demo.reposity.UserRepository;
import com.example.demo.service.CartService;
import com.example.demo.service.OrderService;
import com.example.demo.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private  OrderService orderService;
    @Autowired
    private  PaymentService paymentService;
    @Autowired
    TourRepository tourRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CartService cartService;

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
    @PostMapping("/createWithPayment")
    public ResponseEntity<Map<String, Object>> addOrdersAndPayments(@RequestBody PaymentRequest paymentRequest) {
        // 1. Add multiple orders
    	 List<Order> savedOrders = new ArrayList<>();

    	    for (Order order : paymentRequest.getOrders()) {
    	        // Fetch the actual tour and user from the database based on the IDs
    	        Tour tour = tourRepository.findById(order.getTour().getId()).orElseThrow(() -> new RuntimeException("Tour not found"));
    	        User user = userRepository.findById(order.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
    	        if (order.getOrderDate() == null) {
    	            order.setOrderDate(Instant.now());  // Automatically set the current timestamp if null
    	        }
    	        // Set the fetched tour and user into the order
    	        order.setTour(tour);
    	        order.setUser(user);

    	        // Save the order
    	        savedOrders.add(orderRepository.save(order));
    	    }


        // 2. Only create payment for the first order and generate payment URL
        List<String> paymentUrls = new ArrayList<>();

        if (!savedOrders.isEmpty()) {
            // Get the first order (or you can select any specific order you want)
            Order orderToAddPayment = savedOrders.get(0); // Select first order

            // Call the payment service to add payment for the first order
            String payment = paymentService.addPayment(
                orderToAddPayment.getId(),
                paymentRequest.getTransactionId(),
                paymentRequest.getPaymentMethod(),
                paymentRequest.getPaymentAmount(),
                paymentRequest.getCurrency()
            );

            // Generate the payment URL for this order
            String paymentUrl = paymentService.generatePaymentUrl(
                paymentRequest.getUserId(),
                paymentRequest.getTransactionId(),
                paymentRequest.getPaymentAmount(),
                paymentRequest.getBankCode(),
                "Order Payment",  // Customize the order info as needed
                "vn"              // Language setting
            );

            // Add the generated payment URL to the list
            paymentUrls.add(paymentUrl);

        }

        // Return a success response with the orders, payments, and payment URLs information
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Orders and payments have been successfully created!");
        response.put("orders", savedOrders);
        response.put("paymentUrls", paymentUrls); // Include the generated payment URLs

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
//    @GetMapping(value = "/paymentResponse")
//    public ResponseEntity<?> handlePaymentResponse(
//            @RequestParam(value = "vnp_ResponseCode") String vnp_ResponseCode,
//            @RequestParam(value = "userId") String userId, // Lấy userId từ request
//            @RequestParam(value = "orderIds") List<String> orderIds // Lấy danh sách orderIds từ request
//    ) {
//        try {
//            // Check if the payment response is successful
//            if ("00".equals(vnp_ResponseCode)) {
//                // Get all orders for the user
//                List<Order> orders = orderService.getOrdersByUserId(userId); // Get all orders for the user
//                // Debug log to check the value of orderIds
//                System.out.println("Received orderIds: " + orderIds);
//                System.out.println("Retrieved orders for userId " + userId + ": " + orders);
//                for (Order order : orders) {
//                    if (orderIds.contains(order.getId().toString())) { // Ensure correct comparison between IDs
//                        order.setStatus(OrderStatus.COMPLETED); // Update the status to COMPLETED
//                        orderService.save(order); // Save the updated order to the database
//                        System.out.println("Order ID: " + order.getId() + " updated to completed.");
//                    }
//                }
//
//                return ResponseEntity.ok("Thanh toán thành công và trạng thái các đơn hàng đã được cập nhật.");
//            } else {
//                // Case when payment failed
//                return ResponseEntity.ok("Thất bại");
//            }
//        } catch (Exception e) {
//            // Handle any exception and return an error message
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                                 .body("Error processing the request: " + e.getMessage());
//        }
//    }

    @GetMapping(value = "/paymentResponse")
    public ResponseEntity<?> handlePaymentResponse(
            @RequestParam(value = "vnp_ResponseCode") String vnp_ResponseCode,
            @RequestParam(value = "userId") String userId,
            @RequestParam(value = "orderIds") String orderIdsParam) {

        try {
            // Parse the orderIds string into a List of strings
            List<String> orderIds = Arrays.asList(orderIdsParam.split(","));

            System.out.println("Received orderIds: " + orderIds);  // This will print the order IDs in correct format

            if ("00".equals(vnp_ResponseCode)) {
                List<Order> orders = orderService.getOrdersByUserId(userId);

                for (Order order : orders) {
                    if (orderIds.contains(order.getId().toString())) { // Ensure correct comparison
                        order.setStatus(OrderStatus.COMPLETED);  // Update the order status
                        orderService.save(order);  // Save updated order
                        System.out.println("Order ID: " + order.getId() + " updated to completed.");
                    }
                }
                List<Cart> userCarts = cartService.getCartsByUserId(userId); // Assuming a cartService is available
                for (Cart cart : userCarts) {
                    cartService.delete(cart);  // Delete each cart
                    System.out.println("Deleted cart with ID: " + cart.getId());
                }
                return ResponseEntity.ok("Thanh toán thành công và trạng thái các đơn hàng đã được cập nhật.");
            } else {
                return ResponseEntity.ok("Thất bại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error processing the request: " + e.getMessage());
        }
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

}
