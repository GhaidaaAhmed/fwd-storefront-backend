import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization
        if (authorizationHeader && process.env.TOKEN_SECRET){
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            next()
        }
        else
            throw new Error(`Invalid Token`) 
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

export default verifyAuthToken