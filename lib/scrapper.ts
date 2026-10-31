// lib/scraper.ts
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export interface ScrapedPage {
  title: string;
  url: string;
  content: string;
  publishedDate?: string;
}

export async function scrapeUrl(url: string): Promise<ScrapedPage> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract metadata timestamps
  const publishedDate =
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[name="date"]').attr("content") ||
    $('time').attr("datetime") ||
    undefined;

  // Use Mozilla Readability to strip boilerplate navigation and headers
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return {
    title: article?.title || $("title").text().trim() || "Source Document",
    url,
    content: (article?.textContent || $("body").text()).replace(/\s+/g, " ").trim().slice(0, 10000), // Cap tokens
    publishedDate,
  };
}