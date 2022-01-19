import express, { NextFunction, Request, Response } from 'express'
import { ProductStore } from '../models/product'
import verifyAuthToken from '../../middleware/verify_auth_token'

const store = new ProductStore()

const index = async (_req: Request, res: Response, next:NextFunction) => {
  try{
    const products = await store.index()
    res.json(products)
  }
  catch(err){
    next(err)
  }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
  try{
    const id = Number(req.params.id)
    const product = await store.show(id)
    res.json(product)
  }
  catch(err){
    next(err)
  }
}

const create = async (req: Request, res: Response,next:NextFunction) => {
  try{
    const { name, price } = req.body;
    const new_product = await store.create(name, price)
    res.json(new_product)
  }catch(err){
    next(err)
  }
}



const productRoutes = (app: express.Application) => {
  app.get('/products',index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes