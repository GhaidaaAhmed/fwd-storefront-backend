import express, { NextFunction, Request, Response } from 'express'
import { OrderModel } from '../models/order'
import verifyAuthToken from '../../middleware/verify_auth_token'

const order = new OrderModel()


const create = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const { status , user_id , order_products } = req.body;
        const inserted_order_products = await order.create(status, user_id, order_products)
        res.json(inserted_order_products)
    }
    catch(err){
        next(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, create)
  }
  
  export default orderRoutes