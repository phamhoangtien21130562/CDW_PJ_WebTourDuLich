package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Tour;
import com.example.demo.reposity.TourRepository;

import java.util.List;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;



    public List<Tour> searchTours(String title, String departure, String startDate) {
        // Check and set parameters to null if empty
        if (title != null && title.isEmpty()) title = null;
        if (departure != null && departure.isEmpty()) departure = null;
        if (startDate != null && startDate.isEmpty()) startDate = null;

        // Nếu title, departure hoặc startDate không phải null, ta mới thực hiện điều kiện tìm kiếm
        if (title != null && departure != null && startDate != null) {
            return tourRepository.findByTitleContainingIgnoreCaseAndDepartureContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(
                title, departure, startDate);
        }

        // Xử lý tìm kiếm với ít điều kiện hơn nếu một trong các tham số là null
        if (title != null && departure != null) {
            return tourRepository.findByTitleContainingIgnoreCaseAndDepartureContainingIgnoreCaseAndDeletedFalse(title, departure);
        }

        if (title != null && startDate != null) {
            return tourRepository.findByTitleContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(title, startDate);
        }

        if (departure != null && startDate != null) {
            return tourRepository.findByDepartureContainingIgnoreCaseAndStartDateContainingIgnoreCaseAndDeletedFalse(departure, startDate);
        }

        // Trường hợp còn lại là chỉ tìm theo một tham số
        if (title != null) {
            return tourRepository.findByTitleContainingIgnoreCaseAndDeletedFalse(title);
        }

        if (departure != null) {
            return tourRepository.findByDepartureContainingIgnoreCaseAndDeletedFalse(departure);
        }

        if (startDate != null) {
            return tourRepository.findByStartDateContainingIgnoreCaseAndDeletedFalse(startDate);
        }

        // Nếu tất cả đều null, trả về danh sách toàn bộ tour
        return tourRepository.findByDeletedFalse();
    }
    

}
