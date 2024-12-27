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
exports.bookServices = void 0;
const book_model_1 = require("./book.model");
const createBookIntoDB = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date();
    book.createdAt = currentTime;
    book.updatedAt = currentTime;
    const result = yield book_model_1.Book.create(book);
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.find();
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    data.updatedAt = new Date();
    const result = yield book_model_1.Book.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = book_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.bookServices = {
    createBookIntoDB,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
