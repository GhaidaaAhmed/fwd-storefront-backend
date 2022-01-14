import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers/products'
import userRoutes from './handlers/users'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome")
})

productRoutes(app)
userRoutes(app)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})