import express from 'express';
import { getCustomers, addCustomer, getCustomerDetail, updateOrderQuantity, deleteCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', addCustomer);
router.get('/:id', getCustomerDetail);
router.put('/:customerId/order/:productId', updateOrderQuantity);
router.delete('/:id', deleteCustomer);

export default router;
