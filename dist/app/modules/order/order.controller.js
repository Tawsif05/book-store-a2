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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const result = yield order_service_1.orderService.createOrderIntoDB(order);
        res.status(200).send({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Product not found') {
                res.status(400).send({
                    message: 'Validation failed',
                    success: false,
                    error: err.message,
                    stack: err.stack,
                });
            }
            if (err.message === 'Insufficient stock') {
                res.status(400).send({
                    message: 'Validation failed',
                    success: false,
                    error: err.message,
                    stack: err.stack,
                });
            }
            else {
                res.status(400).send({
                    message: 'Validation failed',
                    success: false,
                    error: err,
                    stack: err.stack,
                });
            }
        }
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.orderService.calculateRevenue();
        res.status(200).send({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue: totalRevenue[0].totalRevenue },
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.send({
                message: 'Validation failed',
                success: false,
                error: err,
                stack: err.stack,
            });
        }
    }
});
exports.orderController = {
    createOrder,
    calculateRevenue,
};
