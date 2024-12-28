import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/revenue", orderController.calculateRevenue);


export const orderRoute = router;