package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.reposity.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getCartsByUserId(String userId) {
        return cartRepository.findByUserId(userId); 
    }

    // Delete a cart
    public void delete(Cart cart) {
        cartRepository.delete(cart);
    }
}
