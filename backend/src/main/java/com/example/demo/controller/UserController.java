package com.example.demo.controller;


import com.example.demo.config.JwtUtils;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.reposity.RoleRepository;
import com.example.demo.reposity.UserRepository;
import com.example.demo.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder; // 👈 thêm dòng này

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User userInput) {
        // Kiểm tra trùng sdt/email
        Optional<User> existingUser = userRepository.findByEmail(userInput.getEmail());
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

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("❌ Email hoặc số điện thoại không tồn tại.");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("❌ Mật khẩu không đúng.");
        }

        // Lấy danh sách tên role
        List<String> roleNames = user.getRoles()
                                     .stream()
                                     .map(Role::getName)
                                     .toList();
        
        String token = JwtUtils.generateToken(user.getEmail(), roleNames, user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());
        response.put("roles", roleNames);
        response.put("token", token);  // Trả token cho frontend


        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Người dùng không tồn tại");
        }

        User user = userOpt.get();

        // Cập nhật các trường cho phép
        user.setFullName(updatedUser.getFullName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setBirthDate(updatedUser.getBirthDate());
        user.setGender(updatedUser.getGender());
        user.setAddress(updatedUser.getAddress());
        user.setInvoiceInfo(updatedUser.getInvoiceInfo());

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email không tồn tại trong hệ thống");
        }

        User user = userOpt.get();

     
        String newPassword = generateRandomPassword(6);

      
        String encodedPassword = passwordEncoder.encode(newPassword);

       
        user.setPassword(encodedPassword);
        userRepository.save(user);

        // Gửi mật khẩu mới về email người dùng
        String subject = "Mật khẩu mới cho tài khoản của bạn";
        String body = "Mật khẩu mới của bạn là: " + newPassword ;
        emailService.sendSimpleEmail(user.getEmail(), subject, body);

        return ResponseEntity.ok("Mật khẩu mới đã được gửi vào email của bạn.");
    }

    private String generateRandomPassword(int length) {
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < length; i++) {
            int idx = random.nextInt(chars.length());
            sb.append(chars.charAt(idx));
        }
        return sb.toString();
    }
}