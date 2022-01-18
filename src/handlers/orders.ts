import express, { Request, Response } from 'express'
import { OrderModel } from '../models/order'
import verifyAuthToken from '../../middleware/verify_auth_token'

const order = new OrderModel()

const index = async (_req: Request, res: Response) => {
    const orders = await order.index()
    res.json(orders)
    
  }

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const order_obj = await order.show(id)
    res.json(order_obj)
}

const create = async (req: Request, res: Response) => {
    const { status , user_id } = req.body;
    const new_order = await order.create(status, user_id)
    res.json(new_order)
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders',verifyAuthToken, index)
    app.get('/orders/:id',verifyAuthToken, show)
    app.post('/orders', verifyAuthToken, create)
  }
  
  export default orderRoutes