import express from 'express';
import { createOrder, confirmOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/confirm/:id', confirmOrder);

export default router;
