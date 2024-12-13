import AppError from "../../utilities/handleError.js"
import { cartSchema, checkCoupon, createCouponSChema, createProductSchema, createSubCategorySchema, multipleImagesSchema, orderSceham, singleImageSchema, updateProductSchema, userSchema } from "./validationSchema.js"

export const validateuserSignUp = (req,res,next)=>{
    const {error} = userSchema.signup.validate(req.body,{abortEarly:false})
    if(error) return next(new AppError(error.message,400))
        next()

}

export const validateCreateSubCategory = (req,res,next)=>{
    const {error} = createSubCategorySchema.body.validate(req.body)
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validateCreateProduct = (req,res,next)=>{
    const {error} = createProductSchema.body.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validateUpdateProduct = (req,res,next)=>{
    const {error} = updateProductSchema.body.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validatecart = (req,res,next)=>{
    const {error} = cartSchema.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validateorder = (req,res,next)=>{
    const {error} = orderSceham.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validatecoupon = (req,res,next)=>{
    const {error} = createCouponSChema.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validatecouponchecker = (req,res,next)=>{
    const {error} = checkCoupon.validate(req.body,{abortEarly:false})
   
    
    if(error) return next(new AppError(error.message,400))
   
        
        next()
}
export const validateSingleImage = (req,res,next)=>{
    const {error} = singleImageSchema.validate(req.files)
    
    
    if(error) return next(new AppError(error.message,400))
   

        next()
}
export const validateMultipleImages = (req,res,next)=>{
    const {error} = multipleImagesSchema.validate(req.files)
    
    
    if(error) return next(new AppError(error.message,400))
   

        next()
}