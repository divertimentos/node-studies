import { Router } from "express";

const router = Router();

/* Product  */

// READ
router.get("/product", (req, res) => {
  res.json({ message: "I'm an updated product response!" });
});

router.get("/product/:id", () => {});

// UPDATE
router.put("/product/:id", () => {});

// CREATE
router.post("/product", () => {});

// DELETE
router.delete("/product/:id", () => {});

/* Update  */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

/* Update Point  */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
