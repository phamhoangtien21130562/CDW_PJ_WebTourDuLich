import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  imageUrl?: string;
}

const BlogGridPage: React.FC = () => {
  const [items, setItems] = useState<RssItem[]>([]);

  useEffect(() => {
    axios.get<RssItem[]>("http://localhost:8080/api/rss/khoahoc")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Lỗi tải RSS:", err));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Tin Tức Du lịch</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {items.map((item, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              {item.imageUrl && (
                <img src={item.imageUrl} className="card-img-top" alt={item.title} />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  {new Date(item.pubDate).toLocaleString()}
                </p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                  Đọc tiếp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGridPage;
