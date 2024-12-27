"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = void 0;
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield book_service_1.bookServices.createBookIntoDB(book);
        res.status(200).send({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: 'Validation failed',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.bookServices.getAllBooks();
        res.status(200).send({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: 'Something went wrong',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield book_service_1.bookServices.getSingleBook(id);
        res.status(200).send({
            message: 'Book retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: 'Something went wrong',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const body = req.body;
        const result = yield book_service_1.bookServices.updateBook(id, body);
        res.status(200).send({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: 'Something went wrong',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        yield book_service_1.bookServices.deleteBook(id);
        res.status(200).send({
            message: 'Book deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({
                message: 'Something went wrong',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
exports.booksController = {
    createBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
