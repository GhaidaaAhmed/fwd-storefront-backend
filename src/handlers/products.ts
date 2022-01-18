import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'
import verifyAuthToken from '../../middleware/verify_auth_token'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
  }

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await store.show(id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const new_product = await store.create(name, price)
    res.json(new_product)
}



const productRoutes = (app: express.Application) => {
  app.get('/products',index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes