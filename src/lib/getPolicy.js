import { getDocuments } from "@/utils/firestore";

/**
 * Fetch policy by type from Firestore only. No static fallback.
 * @param {"privacy" | "terms" | "support"} type
 * @returns {Promise<{ title: string, lastUpdated: string, company: object, content: string } | null>}
 */
export async function getPolicy(type) {
  try {
    const docs = await getDocuments("policies", {
      filters: [{ field: "type", operator: "==", value: type }],
      limit: 1,
    });

    if (!docs || docs.length === 0) {
      return null;
    }

    const doc = docs[0];
    return {
      title: doc.title ?? "",
      titleAr: doc.titleAr ?? "",
      lastUpdated: doc.lastUpdated ?? "",
      company: doc.company ?? null,
      content: doc.content ?? "",
      contentAr: doc.contentAr ?? "",
    };
  } catch (error) {
    console.error(`Error fetching ${type} policy from Firestore:`, error);
    return null;
  }
}
