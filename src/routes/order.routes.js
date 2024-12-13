
import  express  from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js';
import { validateorder } from '../../middleWare/validation/validationExcute.js';
const orderRouter = express.Router()
    orderRouter.post("/",validateorder,createOrder)
    orderRouter.get("/",getOrders)

export default orderRouter