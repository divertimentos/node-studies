import { Router } from "express";
import { handleInputErrors } from "./modules/middleware/handleInputErrors";
import { body, check, oneOf } from "express-validator";
import { createProduct, deleteProduct, getProducts } from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneupdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/* Product  */
router.get("/product", getProducts);
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  () => {},
);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct,
);

router.delete("/product/:id", deleteProduct);

/* Update  */
router.get("/update", getUpdates);
router.get("/update/:id", getOneupdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),

  // NOTE: talvez possam ser usados 'interchangeably'. Guarda pra testar no final do curso
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),

  // oneOf([
  //   check("status").equals("IN_PROGRESS"),
  //   check("status").equals("SHIPPED"),
  //   check("status").equals("DEPRECATED"),
  // ]),
  body("version").optional(),
  updateUpdate,
);
router.post(
  "/update",
  body("title").exists(),
  body("body").isString(),
  body("productId").exists().isString(),
  createUpdate,
);
router.delete("/update/:id", deleteUpdate);

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

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "In router handler" });
});

export default router;
