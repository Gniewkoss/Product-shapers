import { getPayload } from "payload";

import config from "@payload-config";
import {
  seedArticleSummaries,
  seedFooter,
  seedHomepage,
  seedNavigation,
  seedSeo,
} from "./seedData.js";
import { ensureSitePages } from "./sitePagesSeed.js";

async function seed() {
  const payload = await getPayload({ config });

  await ensureSitePages(payload);

  await payload.updateGlobal({ slug: "navigation", data: seedNavigation });
  await payload.updateGlobal({ slug: "homepage", data: seedHomepage });
  await payload.updateGlobal({ slug: "footer", data: seedFooter });
  await payload.updateGlobal({ slug: "seo-defaults", data: seedSeo });

  const existing = await payload.find({ collection: "articles", limit: 1, depth: 0 });
  if (existing.totalDocs > 0) {
    console.info("[seed] Articles already exist — skipped article creation; globals refreshed.");
    return;
  }

  for (const a of seedArticleSummaries) {
    await payload.create({
      collection: "articles",
      data: {
        title: a.title.replace(/\.$/, ""),
        slug: a.slug,
        summary: a.summary,
        excerpt: a.excerpt,
        categoryLabel: a.categoryLabel,
        categoryMeta: a.categoryMeta,
        readingTime: a.readingTime,
        category: a.category,
        tone: a.tone,
        status: "published",
        publishedAt: new Date().toISOString(),
        sections: a.sections.map((s) => ({
          id: s.id,
          number: s.number,
          label: s.label,
          title: s.title,
          contentFormat: s.contentFormat,
          content: s.content,
        })),
      },
    });
  }

  console.info("[seed] Done — globals + articles created.");
}

await seed();
process.exit(0);
