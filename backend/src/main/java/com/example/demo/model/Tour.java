package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.List;

@Data
@Document(collection = "tours")
public class Tour {

    @Id
    private String id;
    private String title;
    private String tourCode;
    private String departure;
    private String destination;
    private String duration;
    private String transport;
    private Double price;
    private List<String> experiences;

    private List<TourDay> schedule;
    private List<DepartureSchedule> departureSchedules;
    private List<String> notes;

    private String mainImageUrl;
    private List<String> subImageUrls;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String endDate;  // Ngày kết thúc tour (có thể dùng String hoặc LocalDate nếu muốn)
    
    private Boolean deleted = false;  // Xoá mềm, mặc định false
    private String availabilityStatus; // Trạng thái: "Còn chỗ", "Hết chỗ", ...
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String startDate;   // Ngày khởi hành tour
    
    // Thêm khóa ngoại danh mục
    private String categoryId;  // ID của danh mục liên quan

    // Getter và Setter
    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getTourCode() {
        return tourCode;
    }

    public void setTourCode(String tourCode) {
        this.tourCode = tourCode;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public List<String> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<String> experiences) {
        this.experiences = experiences;
    }

    public List<TourDay> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<TourDay> schedule) {
        this.schedule = schedule;
    }

    public List<DepartureSchedule> getDepartureSchedules() {
        return departureSchedules;
    }

    public void setDepartureSchedules(List<DepartureSchedule> departureSchedules) {
        this.departureSchedules = departureSchedules;
    }

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }

    public String getMainImageUrl() {
        return mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public List<String> getSubImageUrls() {
        return subImageUrls;
    }

    public void setSubImageUrls(List<String> subImageUrls) {
        this.subImageUrls = subImageUrls;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
}
