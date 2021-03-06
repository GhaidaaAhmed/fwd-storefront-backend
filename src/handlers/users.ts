import express, { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../../middleware/verify_auth_token'

const user = new UserModel()

const index = async (_req: Request, res: Response, next:NextFunction) => {
    try{
        const users = await user.index()
        res.json(users)
    }
    catch(err){
        next(err)
    }
}

const show = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const id = Number(req.params.id)
        const user_obj = await user.show(id)
        res.json(user_obj)
    }
    catch(err){
        next(err)
    }
}

const create = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const { firstName, lastName ,password } = req.body;
        const new_user = await user.create(firstName, lastName ,password)
        var secret:string = process.env.TOKEN_SECRET?process.env.TOKEN_SECRET: 'secret',
        token = jwt.sign({user:{
            id:new_user.id,
            firstname:new_user.firstname,
            lastname:new_user.lastname}},
            secret)
        res.json(token)
    }
    catch(err){
        next(err)
    }
}



const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes