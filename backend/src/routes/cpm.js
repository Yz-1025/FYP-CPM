import { Router } from "express";
import { getCollection } from "../db.js";
import { mapProduct } from "../mapProduct.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const q = (req.query.q || "").trim();

    const col = getCollection();
    const filter = q
      ? {
          $or: [
            { pcmNo: { $regex: q, $options: "i" } },
            { "display.name.zh": { $regex: q, $options: "i" } },
            { "display.name.en": { $regex: q, $options: "i" } },
            { "display.brand.zh": { $regex: q, $options: "i" } },
            { "display.brand.en": { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [total, items] = await Promise.all([
      col.countDocuments(filter),
      col
        .find(filter, {
          projection: {
            pcmNo: 1,
            firstIssueDate: 1,
            display: 1,
          },
        })
        // Cosmos DB: sort must use _id when using selective projection
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
    ]);

    res.json({
      page,
      limit,
      total,
      items: items.map(mapProduct),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:pcmNo", async (req, res, next) => {
  try {
    const col = getCollection();
    const doc = await col.findOne({ pcmNo: req.params.pcmNo });
    if (!doc) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(mapProduct(doc));
  } catch (err) {
    next(err);
  }
});

export default router;
