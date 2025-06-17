package com.example.demo.controller;

import com.example.demo.model.RssItem;
import com.example.demo.service.RssService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/rss")
public class RssController {

    @Autowired
    private RssService rssService;

    @GetMapping("/dulich")
    public List<RssItem> getKhoaHocRss() {
        return rssService.fetchRss();
    }
}
