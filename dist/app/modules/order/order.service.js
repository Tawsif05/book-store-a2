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
exports.orderService = void 0;
const book_model_1 = require("../books/book.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(order.product);
    if (!book) {
        throw new Error('Product not found');
    }
    if (book.quantity < order.quantity) {
        throw new Error('Insufficient stock');
    }
    const result = new order_model_1.Order(order);
    yield result.save();
    book.quantity = book.quantity - order.quantity;
    if (book.quantity === 0) {
        book.inStock = false;
    }
    yield book.save();
    return result;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
    ]);
    return result;
});
exports.orderService = {
    createOrderIntoDB,
    calculateRevenue,
};
