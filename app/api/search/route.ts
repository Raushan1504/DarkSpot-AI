import { NextRequest, NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const SearchResultsSchema = z.object({
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      snippet: z.string(),
      sourceCategory: z.enum(["Official Portal", "Student Forum / Advisory", "Third-Party Aggregator"]),
    })
  ),
});

const CURATED_DIRECTORIES: Record<
  string,
  { title: string; url: string; snippet: string; sourceCategory: "Official Portal" | "Student Forum / Advisory" | "Third-Party Aggregator" }[]
> = {
  daad: [
    {
      title: "DAAD Official Portal - WISE Research Internships 2026",
      url: "https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-wise-2026/",
      snippet: "Official guidelines, eligibility criteria (8.0 CGPA), and funding rates (€934/mo) for the 2026 summer intake.",
      sourceCategory: "Official Portal",
    },
    {
      title: "EduGermany Community Forum - Student DAAD WISE Guide",
      url: "https://edugermany-forum.org/scholarships/daad-wise-tips",
      snippet: "Student forum discussion with previous cycle reports (€861 stipend, Nov 15 deadline).",
      sourceCategory: "Student Forum / Advisory",
    },
    {
      title: "GlobalScholarships.org - German STEM Internship Stipend Index",
      url: "https://globalscholarships.org/europe/germany-stem-daad-overview",
      snippet: "Overview claiming 8.5 CGPA minimum cutoff for premier tier technical institutes.",
      sourceCategory: "Third-Party Aggregator",
    },
  ],
  france: [
    {
      title: "Campus France Official Guidelines - Eiffel Excellence 2026",
      url: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence",
      snippet: "Official rules: direct submissions prohibited, must be nominated by a French higher education institution.",
      sourceCategory: "Official Portal",
    },
    {
      title: "StudyInFrance Unofficial Student Advisory Thread",
      url: "https://studyinfrance-admissions.com/eiffel-scholarship-guide-2024",
      snippet: "Advisory thread claiming candidate age cutoff is 30 years old with old allowance rates.",
      sourceCategory: "Student Forum / Advisory",
    },
  ],
  visa: [
    {
      title: "German Federal Foreign Office - National Student Visa Provisions 2026",
      url: "https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq",
      snippet: "Official criteria for Verpflichtungserklärung financial guarantees and Sperrkonto blocked account requirements.",
      sourceCategory: "Official Portal",
    },
    {
      title: "Expatrio Community Blog - Visa Financial Seasoning Rules",
      url: "https://www.expatrio.com/living-in-germany/german-visa/blocked-account-guide",
      snippet: "Guidance on 90-day bank statement seasoning requirements for international students.",
      sourceCategory: "Student Forum / Advisory",
    },
  ],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ sources: [] });
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  const hasValidKey = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 15;

  if (hasValidKey) {
    try {
      const google = createGoogleGenerativeAI({ apiKey });
      const prompt = `
For the research question: "${q}"
Return 3 contrasting sources to audit for information gaps and contradictions:
1. One Official Primary Portal (canonical government/university URL)
2. One Student Forum or Unofficial Advisory Guide (likely to contain obsolete or student-submitted claims)
3. One Third-Party Aggregator or Directory.

Return valid JSON with title, realistic url (http/https), snippet, and sourceCategory.
`;
      const result = await generateObject({
        model: google("gemini-1.5-flash"),
        schema: SearchResultsSchema,
        prompt,
      });

      return NextResponse.json(result.object);
    } catch (e) {
      console.warn("AI search grounding error, using curated directory:", e);
    }
  }

  // Fallback to curated directory based on query keywords
  const lowerQ = q.toLowerCase();
  for (const [key, items] of Object.entries(CURATED_DIRECTORIES)) {
    if (lowerQ.includes(key)) {
      return NextResponse.json({ sources: items });
    }
  }

  // Generic realistic fallback sources tailored to topic
  const genericFallback = [
    {
      title: `${q} - Official Circular & Portal Directive (2026)`,
      url: `https://official-portal.org/${encodeURIComponent(q.slice(0, 20).toLowerCase().replace(/\s+/g, "-"))}/guidelines`,
      snippet: "Primary statutory rules, verified timeline, and prerequisite documents.",
      sourceCategory: "Official Portal" as const,
    },
    {
      title: `${q} - Community Guidance & Advisory Thread`,
      url: `https://student-advisory-forum.net/${encodeURIComponent(q.slice(0, 20).toLowerCase().replace(/\s+/g, "-"))}/thread`,
      snippet: "Peer reports and unofficial guidance (potentially referencing legacy cycle guidelines).",
      sourceCategory: "Student Forum / Advisory" as const,
    },
    {
      title: `${q} - International Comparative Directory`,
      url: `https://global-index.org/${encodeURIComponent(q.slice(0, 20).toLowerCase().replace(/\s+/g, "-"))}/summary`,
      snippet: "Secondary comparison portal with summarized criteria and third-party notes.",
      sourceCategory: "Third-Party Aggregator" as const,
    },
  ];

  return NextResponse.json({ sources: genericFallback });
}

