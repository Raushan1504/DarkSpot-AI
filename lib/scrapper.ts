// lib/scrapper.ts
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export interface ScrapedPage {
  title: string;
  url: string;
  content: string;
  publishedDate?: string;
}

/**
 * Attempts direct extraction with high-fidelity Chrome browser headers.
 */
async function scrapeDirect(url: string): Promise<ScrapedPage> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9,de;q=0.8,fr;q=0.7",
      "Sec-Ch-Ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  if (!html || html.trim().length < 100) {
    throw new Error("HTML response is too short or empty.");
  }

  const $ = cheerio.load(html);

  // Extract metadata timestamps
  const publishedDate =
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[name="date"]').attr("content") ||
    $('meta[name="pubdate"]').attr("content") ||
    $("time").attr("datetime") ||
    undefined;

  // Use Mozilla Readability to strip boilerplate navigation and headers
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  const title = article?.title || $("title").text().trim() || "Source Document";
  const rawContent = article?.textContent || $("body").text();
  const cleanedContent = rawContent.replace(/\s+/g, " ").trim();

  if (cleanedContent.length < 50) {
    throw new Error("Extracted content too short (likely SPA or bot challenge).");
  }

  return {
    title,
    url,
    content: cleanedContent.slice(0, 10000),
    publishedDate,
  };
}

/**
 * Fallback extraction using Jina Reader proxy (renders JS, handles Cloudflare/SPA).
 */
async function scrapeWithJina(url: string): Promise<ScrapedPage> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const response = await fetch(jinaUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-No-Cache": "true",
      Accept: "text/plain",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Jina Reader HTTP ${response.status}`);
  }

  const text = await response.text();
  if (!text || text.trim().length < 50) {
    throw new Error("Jina Reader returned empty content.");
  }

  // Extract title from markdown header (e.g. Title: ... or # ...)
  let title = "Source Document";
  const titleMatch = text.match(/^Title:\s*(.+)$/m) || text.match(/^#\s*(.+)$/m);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].trim();
  } else {
    try {
      title = new URL(url).hostname;
    } catch {
      title = "Source Document";
    }
  }

  // Extract year / date if present in text
  const dateMatch = text.match(
    /\b(202[3-6][-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]202[3-6]|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+202[3-6])\b/i
  );
  const publishedDate = dateMatch ? dateMatch[0] : undefined;

  return {
    title,
    url,
    content: text.replace(/\s+/g, " ").trim().slice(0, 10000),
    publishedDate,
  };
}

/**
 * Resilient multi-tier scraper:
 * Tier 1: Direct fetch with browser headers.
 * Tier 2: Jina Reader markdown proxy (handles SPAs, JS execution, Cloudflare challenges).
 */
export async function scrapeUrl(url: string): Promise<ScrapedPage> {
  // 1. Attempt Direct Scrape
  try {
    return await scrapeDirect(url);
  } catch (directErr) {
    console.warn(
      `Direct scrape failed for ${url} (${(directErr as Error).message}), attempting Jina Reader proxy...`
    );
  }

  // 2. Attempt Jina Reader Proxy Fallback
  try {
    return await scrapeWithJina(url);
  } catch (jinaErr) {
    console.warn(`Jina Reader fallback failed for ${url}:`, (jinaErr as Error).message);
    throw new Error(`Failed to scrape ${url} via both direct and proxy channels.`);
  }
}
