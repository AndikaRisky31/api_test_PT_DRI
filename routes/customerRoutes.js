import express from 'express';
import { getCustomers, addCustomer, getCustomerDetail, updateOrderQuantity, deleteCustomer, searchCustomers } from '../controllers/customerController.js';
import { delayMiddleware } from '../middlewares/delayMiddleware.js';

const router = express.Router();

router.use(delayMiddleware);

router.get('/search', searchCustomers);
router.get('/', getCustomers);
router.post('/', addCustomer);
router.get('/:id', getCustomerDetail);
router.put('/:customerId/orders/:productId', updateOrderQuantity);
router.delete('/:id', deleteCustomer);

export default router;
