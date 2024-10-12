import { Router } from "express";
import { handleInputErrors } from "./modules/middleware/handleInputErrors";
import { body, check, oneOf } from "express-validator";

const router = Router();

/* Product  */
router.get("/product", (req, res) => {
  res.json({ message: "I'm an updated product response!" });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {},
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {},
);
router.delete("/product/:id", () => {});

/* Update  */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  // body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  oneOf([
    check("status").equals("IN_PROGRESS"),
    check("status").equals("SHIPPED"),
    check("status").equals("DEPRECATED"),
  ]),
  body("version").optional(),
  () => {},
);
router.post(
  "/update",
  body("title").exists(),
  body("body").isString(),
  () => {},
);
router.delete("/update/:id", () => {});

/* Update Point  */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {},
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  () => {},
);
router.delete("/updatepoint/:id", () => {});

export default router;
