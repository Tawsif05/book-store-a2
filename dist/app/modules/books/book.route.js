"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/", book_controller_1.booksController.createBook);
router.get("/", book_controller_1.booksController.getBooks);
router.get("/:productId", book_controller_1.booksController.getSingleBook);
router.put("/:productId", book_controller_1.booksController.updateBook);
router.delete("/:productId", book_controller_1.booksController.deleteBook);
exports.booksRoutes = router;
