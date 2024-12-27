import express from "express";
import { booksController } from "./book.controller";

const router = express.Router();

router.post("/", booksController.createBook);
router.get("/", booksController.getBooks);
router.get("/:productId", booksController.getSingleBook);
router.put("/:productId", booksController.updateBook);
router.delete("/:productId", booksController.deleteBook);

export const booksRoutes = router;