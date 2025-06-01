package com.example.demo.model;

import lombok.Data;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class DepartureSchedule {
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String departureDate; // Ngày khởi hành

    private String price; // Giá tour, ví dụ "9.990.000 VNĐ"

    private String status; // Trạng thái, ví dụ "Lịch Hàng Tuần"

	
	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
}
