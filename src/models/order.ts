import { db_query, db_query_with_params} from "../database";

export type Order = {
    id: Number;
    user_id:Number;
    status: string;
}
export class OrderModel{
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders'
            const result = await db_query(sql)
            return result.rows 
        } catch (err) {
          throw new Error(`Could not get all orders. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await db_query_with_params(sql, [id]);
            return result.rows[0]
        } catch (err) {
          throw new Error(`Could not find order. Error: ${err}`)
        }
    }

    async create(status:string, user_id: number): Promise<Order> {
        try {
          const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
          const result = await db_query_with_params(sql, [status, user_id]);
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not create order. Error: ${err}`)
        }
    }
}