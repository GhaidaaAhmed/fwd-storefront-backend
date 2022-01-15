import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers/products'
import userRoutes from './handlers/users'
import dashboardRoutes from './handlers/dashboard'
import orderRoutes from './handlers/orders'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome")
})

productRoutes(app)
userRoutes(app)
dashboardRoutes(app)
orderRoutes(app)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

export default app