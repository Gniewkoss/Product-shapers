import { getPayload } from "payload";

import config from "@payload-config";
import {
  seedArticleSummaries,
  seedFooter,
  seedHomepage,
  seedNavigation,
  seedSeo,
} from "./seedData.js";
import { flattenLayoutBlocks } from "./flattenLayoutBlock.js";
import { ensureSitePages } from "./sitePagesSeed.js";

async function seed() {
  const payload = await getPayload({ config });

  await ensureSitePages(payload);

  await payload.updateGlobal({ slug: "navigation", data: seedNavigation });
  await payload.updateGlobal({
    slug: "homepage",
    data: {
      ...seedHomepage,
      homeContinuationLayout: flattenLayoutBlocks(seedHomepage.homeContinuationLayout),
    },
  });
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
        layout: a.layout ?? [],
      },
    });
  }

  const picks = await payload.find({
    collection: "articles",
    limit: 3,
    depth: 0,
    sort: "-publishedAt",
    where: { status: { equals: "published" } },
  });
  await payload.updateGlobal({
    slug: "homepage",
    data: {
      featuredKnowledgeArticles: picks.docs.map((d) => d.id),
    },
  });

  console.info("[seed] Done — globals + articles created.");
}

await seed();
process.exit(0);
