package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.ErrorResponse;
import com.example.demo.model.Tour;
import com.example.demo.model.User;
import com.example.demo.reponsive.CartResponse;
import com.example.demo.reposity.CartRepository;
import com.example.demo.reposity.TourRepository;
import com.example.demo.reposity.UserRepository;
import com.example.demo.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/carts")
public class CartController {

	@Autowired
	private CartRepository cartRepository;

    @Autowired
    private CartService cartService;
	@Autowired
	private TourRepository tourRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/orders/{userId}")
	public List<CartResponse> getAllOrdersByUserId(@PathVariable String userId) {
	    List<Cart> carts = cartService.getCartsByUserId(userId);
	    return carts.stream()
	            .map(cart -> new CartResponse(
	                    cart.getId(), // cartId
	                    cart.getTour().getTitle(), // tourTitle
	                    cart.getTotalPrice(), // tourPrice
	                    cart.getNumberOfGuests(), // numberOfGuests
	                    cart.getUser().getFullName(), // userFullName
	                    cart.getUser().getEmail(), // userEmail
	                    cart.getUser().getId(), // userId (added)
	                    cart.getTour().getId() // tourId (added)
	            ))
	            .toList();
	}
	   @PostMapping
	    public ResponseEntity<Cart> createCart(@RequestBody Cart cartData) {
	        try {
	            // Make sure the tour and user exist before setting them
	            User user = userRepository.findById(cartData.getUser().getId()).orElse(null);
	            Tour tour = tourRepository.findById(cartData.getTour().getId()).orElse(null);

	            if (user == null || tour == null) {
	                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	            }
	            // Ensure the number of guests is set
	            if (cartData.getNumberOfGuests() == null || cartData.getNumberOfGuests() <= 0) {
	                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	            }
	            cartData.setUser(user);
	            cartData.setTour(tour);
	            
	            cartData.calculateTotalPrice(); // Calculate total price based on numGuests

	            // Save to the database
	            Cart savedCart = cartRepository.save(cartData);
	            return new ResponseEntity<>(savedCart, HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	   @DeleteMapping("/{cartId}")
	    public ResponseEntity<ErrorResponse> deleteCart(@PathVariable String cartId) {
	        try {
	            // Check if the cart exists
	            Optional<Cart> cart = cartRepository.findById(cartId);
	            if (!cart.isPresent()) {
	                return new ResponseEntity<>(new ErrorResponse("Cart not found"), HttpStatus.NOT_FOUND);
	            }

	            // Delete the cart
	            cartRepository.deleteById(cartId);

	            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Successful delete, no content in response body
	        } catch (Exception e) {
	            // If an error occurs, return a 500 Internal Server Error
	            return new ResponseEntity<>(new ErrorResponse("Error deleting the cart"), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

}
