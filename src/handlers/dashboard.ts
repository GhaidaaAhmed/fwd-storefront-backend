import express, { Request, Response } from 'express'
import verifyAuthToken from '../../middleware/verify_auth_token'
import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()

const getUserOrders = async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.user_id)
        const user_orders = await dashboard.getUserOrders(user_id)
        res.json(user_orders)

    } catch (err) {
        res.status(400)
        res.json(err)
    }
  }


const dashboardRoutes = (app: express.Application) => {
  app.get('/users/:user_id/orders', verifyAuthToken, getUserOrders)
}

export default dashboardRoutes