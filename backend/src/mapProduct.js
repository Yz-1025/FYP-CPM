/**
 * Maps a MongoDB document to the shape expected by the frontend detail/list views.
 */
export function mapProduct(doc) {
  if (!doc) return null;

  const field = (block) => ({
    zh: block?.zh ?? null,
    en: block?.en ?? null,
    sc: block?.sc ?? null,
    available: Boolean(block?.zh || block?.en || block?.sc),
    source: block?.source ?? null,
  });

  return {
    pcmNo: doc.pcmNo,
    firstIssueDate: doc.firstIssueDate ?? null,
    name: field(doc.display?.name),
    brand: field(doc.display?.brand),
    dosageForm: field(doc.display?.dosageForm),
    ingredients: field(doc.display?.ingredients),
    manufacturer: field(doc.display?.manufacturer),
    regHolder: field(doc.display?.regHolder),
    packings: (doc.display?.packings ?? []).map((p) => ({
      id: p.id,
      description: field(p.description),
    })),
    efficacy: field(doc.display?.efficacy),
    contraindications: field(doc.display?.contraindications),
    precautions: field(doc.display?.precautions),
    images: (doc.display?.images ?? []).map((img) => ({
      url: img.url,
      source: img.source ?? null,
      caption: img.caption ?? null,
    })),
  };
}
