package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Order;
import com.example.demo.reposity.OrderRepository;
@Service
public class OrderService {
	  private final OrderRepository orderRepository;

	    @Autowired
	    public OrderService(OrderRepository orderRepository) {
	        this.orderRepository = orderRepository;
	    }

	 

	    // Thêm nhiều đơn hàng mới
	    public List<Order> addOrders(List<Order> orders) {
	        return orderRepository.saveAll(orders);  // Lưu nhiều đơn hàng cùng lúc
	    }

	    // Lấy tất cả đơn hàng
	    public List<Order> getAllOrders() {
	        return orderRepository.findAll();
	    }

	    // Lấy đơn hàng theo ID
	    public Order getOrderById(String id) {
	        return orderRepository.findById(id).orElse(null);
	    }

	    // Lấy tất cả các đơn hàng của người dùng theo userId
	    public List<Order> getOrdersByUserId(String userId) {
	        return orderRepository.findByUserId(userId); // Tìm kiếm đơn hàng của người dùng theo userId
	    }

	    // Lưu đơn hàng vào cơ sở dữ liệu
	    public Order save(Order order) {
	        return orderRepository.save(order); // Lưu đơn hàng vào MongoDB
	    }

	    // Xóa đơn hàng theo ID
	    public void deleteOrder(String id) {
	        orderRepository.deleteById(id);
	    }
}
