package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import javax.validation.Valid;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Lấy danh sách tất cả danh mục
    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody @Valid Category category) {
        try {
            Category createdCategory = categoryService.addCategory(category);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        } catch (IllegalArgumentException ex) {
            // Trả về thông báo lỗi chi tiết nếu tên danh mục đã tồn tại
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    // Xoá danh mục
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Cập nhật danh mục
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody @Valid Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Lỗi 400 nếu tên đã tồn tại
        }
    }
}