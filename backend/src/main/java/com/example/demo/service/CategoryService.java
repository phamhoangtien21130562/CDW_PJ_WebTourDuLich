package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.reposity.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Kiểm tra tên danh mục đã tồn tại trong cơ sở dữ liệu chưa
    private void checkCategoryNameExist(String name) {
        Optional<Category> existingCategory = categoryRepository.findByName(name);
        if (existingCategory.isPresent()) {
            throw new IllegalArgumentException("Tên danh mục đã tồn tại. Vui lòng chọn tên khác.");
        }
    }

    // Lấy tất cả danh mục
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Thêm danh mục mới
    public Category addCategory(Category category) {
        // Kiểm tra tên danh mục
        checkCategoryNameExist(category.getName());
        return categoryRepository.save(category);
    }

    // Xoá danh mục
    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    // Cập nhật danh mục
    public Category updateCategory(String id, Category category) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            checkCategoryNameExist(category.getName());  // Kiểm tra tên mới trước khi cập nhật
            category.setId(id);
            return categoryRepository.save(category);
        }
        throw new RuntimeException("Danh mục không tồn tại");
    }
}