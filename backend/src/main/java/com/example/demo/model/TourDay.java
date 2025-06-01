package com.example.demo.model;
import lombok.Data;

@Data
public class TourDay {

    private int dayNumber; 
    private String description;
	public int getDayNumber() {
		return dayNumber;
	}
	public void setDayNumber(int dayNumber) {
		this.dayNumber = dayNumber;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	} 
    
}
