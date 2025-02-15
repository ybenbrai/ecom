"use client";

import { fetchNews } from "@src/services/news.service";
import { useEffect, useState } from "react";

type NewsItem = { id: number; title: string };
export default function NewsBar() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <div className="fixed top-0 w-full h-8 bg-red-700 z-50 overflow-hidden flex items-center">
      <div className="marquee">
        {news.map((item) => (
          <span key={item.id} className="text-white text-lg mx-4">
            🚀 {item.title}
          </span>
        ))}
      </div>
    </div>
  );
}
