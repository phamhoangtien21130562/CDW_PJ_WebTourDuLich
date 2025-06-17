package com.example.demo.model;

import java.util.Date;

public class RssItem {
    private String title;
    private String link;
    private Date pubDate;
    private String imageUrl; // 👈 Thêm dòng này

    public RssItem(String title, String link, Date pubDate, String imageUrl) {
        this.title = title;
        this.link = link;
        this.pubDate = pubDate;
        this.imageUrl = imageUrl; // 👈 Gán luôn
    }

    public String getTitle() {
        return title;
    }

    public String getLink() {
        return link;
    }

    public Date getPubDate() {
        return pubDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
