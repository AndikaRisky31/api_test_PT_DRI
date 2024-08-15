import express from 'express';
import { createOrder, confirmOrder } from '../controllers/orderController.js';
import { delayMiddleware } from '../middlewares/delayMiddleware.js';

const router = express.Router();

router.use(delayMiddleware);


router.post('/', createOrder);
router.post('/confirm/:id', confirmOrder);

export default router;
