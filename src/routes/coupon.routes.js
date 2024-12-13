
import  express  from 'express';
import { createCoupon ,checkCoupon} from '../controllers/couponController.js';
import { validatecoupon, validatecouponchecker } from '../../middleWare/validation/validationExcute.js';
const couponRoutes = express.Router()

couponRoutes.post("/",validatecoupon,createCoupon)
couponRoutes.post("/check",validatecouponchecker,checkCoupon)

export default couponRoutes