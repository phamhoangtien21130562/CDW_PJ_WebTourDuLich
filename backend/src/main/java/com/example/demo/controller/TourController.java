package com.example.demo.controller;

import com.example.demo.model.Tour;
import com.example.demo.reposity.TourRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "http://localhost:5173")
public class TourController {

    private final TourRepository tourRepository;

    @Value("${upload.path}")
    private String pathUploadImage;

    public TourController(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable String id) {
        return tourRepository.findById(id)
            .map(tour -> ResponseEntity.ok(tour))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDeleteTour(@PathVariable String id) {
        return tourRepository.findById(id)
            .map(tour -> {
                if (Boolean.TRUE.equals(tour.getDeleted())) {
                    // Nếu đã xóa rồi có thể trả về 409 Conflict hoặc 200 bình thường
                    return ResponseEntity.status(409).body("Tour đã bị xóa trước đó");
                }
                tour.setDeleted(true); // đánh dấu xóa mềm
                tourRepository.save(tour);
                return ResponseEntity.ok("Xóa tour thành công");
            })
            .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateTour(
            @PathVariable String id,
            @RequestPart("tour") Tour updatedTour,
            @RequestPart(value = "mainImage", required = false) MultipartFile mainImage,
            @RequestPart(value = "subImages", required = false) MultipartFile[] subImages
    ) {
        try {
            // Tìm tour theo id
            Tour existingTour = tourRepository.findById(id).orElse(null);
            if (existingTour == null) {
                return ResponseEntity.notFound().build();
            }

            // Cập nhật các trường thông tin tour (ngoại trừ ảnh)
            existingTour.setTitle(updatedTour.getTitle());
            existingTour.setTourCode(updatedTour.getTourCode());
            existingTour.setDeparture(updatedTour.getDeparture());
            existingTour.setDestination(updatedTour.getDestination());
            existingTour.setDuration(updatedTour.getDuration());
            existingTour.setTransport(updatedTour.getTransport());
            existingTour.setPrice(updatedTour.getPrice());
            existingTour.setExperiences(updatedTour.getExperiences());
            existingTour.setSchedule(updatedTour.getSchedule());
            existingTour.setDepartureSchedules(updatedTour.getDepartureSchedules());
            existingTour.setNotes(updatedTour.getNotes());
            existingTour.setEndDate(updatedTour.getEndDate());
            existingTour.setDeleted(updatedTour.getDeleted());
            existingTour.setAvailabilityStatus(updatedTour.getAvailabilityStatus());
            existingTour.setStartDate(updatedTour.getStartDate());
            existingTour.setCategoryId(updatedTour.getCategoryId());

            // Nếu có ảnh chính mới, lưu và cập nhật
            if (mainImage != null && !mainImage.isEmpty()) {
                String mainImageFileName = saveFile(mainImage);
                existingTour.setMainImageUrl(mainImageFileName);
            }

            // Nếu có ảnh con mới, lưu và cập nhật
            if (subImages != null && subImages.length > 0) {
                List<String> subImageFileNames = new ArrayList<>();
                for (MultipartFile file : subImages) {
                    if (!file.isEmpty()) {
                        String fileName = saveFile(file);
                        subImageFileNames.add(fileName);
                    }
                }
                existingTour.setSubImageUrls(subImageFileNames);
            }

            // Lưu cập nhật vào DB
            Tour savedTour = tourRepository.save(existingTour);
            return ResponseEntity.ok(savedTour);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi cập nhật file ảnh");
        }
    }
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Tour>> getToursByCategory(@PathVariable String categoryId) {
        // Tìm các tour có categoryId tương ứng và chưa bị xóa
        List<Tour> tours = tourRepository.findByCategoryIdAndDeletedFalse(categoryId);
        if (tours.isEmpty()) {
            return ResponseEntity.noContent().build(); // Nếu không có tour nào
        }
        return ResponseEntity.ok(tours);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createTour(
            @RequestPart("tour") Tour tour,
            @RequestPart("mainImage") MultipartFile mainImage,
            @RequestPart(value = "subImages", required = false) MultipartFile[] subImages
    ) {
        try {
            // Lưu ảnh chính
            String mainImageFileName = saveFile(mainImage);
            tour.setMainImageUrl(mainImageFileName);

            // Lưu các ảnh con
            List<String> subImageFileNames = new ArrayList<>();
            if (subImages != null) {
                for (MultipartFile file : subImages) {
                    if (!file.isEmpty()) {
                        String fileName = saveFile(file);
                        subImageFileNames.add(fileName);
                    }
                }
            }
            tour.setSubImageUrls(subImageFileNames);

            // Lưu tour vào DB
            Tour savedTour = tourRepository.save(tour);
            return ResponseEntity.ok(savedTour);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi lưu file ảnh");
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File convFile = new File(pathUploadImage + "/" + fileName);
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return fileName;
    }
    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours() {
        List<Tour> tours = tourRepository.findByDeletedFalse();
        return ResponseEntity.ok(tours);
    }
}
