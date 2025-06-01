package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId; // ID của người mua

    private List<OrderItem> items; // danh sách sản phẩm

    private double totalAmount;

    private String status; // PENDING, PROCESSING, COMPLETED, CANCELLED

    private Date orderDate = new Date();

    // nested class đại diện 1 sản phẩm trong đơn hàng
    @Data
    public static class OrderItem {
        private String productId;
        private String productName;
        private int quantity;
        private double price;
    }
}
