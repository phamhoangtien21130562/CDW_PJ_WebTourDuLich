package com.example.demo.controller;


import com.example.demo.model.Cart;
import com.example.demo.model.ErrorResponse;
import com.example.demo.model.User;
import com.example.demo.reposity.CartRepository;
import com.example.demo.reposity.TourRepository;
import com.example.demo.reposity.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> addCart(@RequestBody Cart cart) {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (cart.getUser() == null) {
            // Trả về thông báo lỗi khi người dùng chưa đăng nhập
            ErrorResponse errorResponse = new ErrorResponse("Vui lòng đăng nhập để đặt tour");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Kiểm tra người dùng có tồn tại trong cơ sở dữ liệu không
        Optional<User> existingUser = userRepository.findById(cart.getUser().getId());
        if (!existingUser.isPresent()) {
            // Trả về lỗi 404 nếu người dùng không tồn tại
            ErrorResponse errorResponse = new ErrorResponse("Người dùng không tồn tại");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

       
        cart.calculateTotalPrice();

        // Lưu giỏ hàng vào cơ sở dữ liệu
        Cart savedCart = cartRepository.save(cart);

        // Trả về giỏ hàng đã lưu với mã trạng thái 201 (Created)
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCart);
    }

}
