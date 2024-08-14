import express from 'express';
import { addCustomer, getCustomerDetail, deleteCustomer,getCustomers } from '../controllers/customerController.js';

const router = express.Router();

router.post('/customers', addCustomer);
router.get('/customers/:id', getCustomerDetail);
router.delete('/customers/:id', deleteCustomer);
router.get('/customers', getCustomers);

export default router;
