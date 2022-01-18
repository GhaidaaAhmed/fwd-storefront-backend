import express, { Request, Response } from 'express'
import { UserModel } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../../middleware/verify_auth_token'

const user = new UserModel()

const index = async (_req: Request, res: Response) => {
    const users = await user.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user_obj = await user.show(id)
    res.json(user_obj)
}

const create = async (req: Request, res: Response) => {
    const { firstName, lastName ,password } = req.body;
    const new_user = await user.create(firstName, lastName ,password)
    var secret:string = process.env.TOKEN_SECRET?process.env.TOKEN_SECRET: 'secret',
    token = jwt.sign({user: new_user}, secret)
    res.json(token)
}



const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes