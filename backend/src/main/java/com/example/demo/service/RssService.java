package com.example.demo.service;

import com.example.demo.model.RssItem;
import com.rometools.rome.feed.synd.*;
import com.rometools.rome.io.*;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RssService {
    private static final String RSS_URL = "https://vnexpress.net/rss/du-lich.rss";

    public List<RssItem> fetchRss() {
        try {
            URL url = new URL(RSS_URL);
            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(url));

            return feed.getEntries().stream().map(entry -> {
                String imageUrl = "";

                List<SyndEnclosure> enclosures = entry.getEnclosures();
                if (enclosures != null && !enclosures.isEmpty()) {
                    imageUrl = enclosures.get(0).getUrl();
                }

                return new RssItem(
                    entry.getTitle(),
                    entry.getLink(),
                    entry.getPublishedDate(),
                    imageUrl
                );
            }).collect(Collectors.toList());

        } catch (Exception e) {
            throw new RuntimeException("Không thể đọc RSS", e);
        }
    }
}
