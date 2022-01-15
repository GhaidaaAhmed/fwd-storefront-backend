import express, { Request, Response } from 'express'
import { OrderModel } from '../models/order'
import verifyAuthToken from '../../middleware/verify_auth_token'

const order = new OrderModel()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await order.index()
        res.json(orders)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
  }

const show = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const order_obj = await order.show(id)
        res.json(order_obj)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { status , user_id } = req.body;
        const new_order = await order.create(status, user_id)
        res.json(new_order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id',verifyAuthToken, show)
    app.post('/orders', verifyAuthToken, create)
  }
  
  export default orderRoutes