package com.example.demo.controller;


import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.reposity.RoleRepository;
import com.example.demo.reposity.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // 👈 thêm dòng này

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User userInput) {
        // Kiểm tra trùng sdt/email
        Optional<User> existingUser = userRepository.findByEmailOrPhone(userInput.getEmailOrPhone());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("❌ Email hoặc số điện thoại đã tồn tại.");
        }

        // Gán ROLE_USER mặc định
        Optional<Role> roleUser = roleRepository.findByName("ROLE_USER");
        if (roleUser.isEmpty()) {
            return ResponseEntity.badRequest().body("⚠️ Vai trò ROLE_USER chưa tồn tại.");
        }

        // ✅ Băm mật khẩu
        String encodedPassword = passwordEncoder.encode(userInput.getPassword());
        userInput.setPassword(encodedPassword);

        userInput.setRoles(Collections.singleton(roleUser.get()));

      
        userRepository.save(userInput);

        return ResponseEntity.ok("✅ Đăng ký người dùng thành công.");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
       
        Optional<User> userOpt = userRepository.findByEmailOrPhone(loginRequest.getEmailOrPhone());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("❌ Email hoặc số điện thoại không tồn tại.");
        }

        User user = userOpt.get();

       
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("❌ Mật khẩu không đúng.");
        }

        return ResponseEntity.ok("✅ Đăng nhập thành công!");
    }

}