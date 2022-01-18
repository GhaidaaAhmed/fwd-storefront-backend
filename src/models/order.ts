import { db_query, db_query_with_params} from "../database";
import format from 'pg-format'

export type Order = {
    id: Number;
    user_id:Number;
    status: string;
}

export type OrderProducts = {
  product_id:Number,
  quantity: number,
  order_id: undefined | number
}
export class OrderModel{
    async create(status:string, user_id: number, order_products: OrderProducts[]): Promise<OrderProducts[]> {
        try {
          const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING id'
          const result = await db_query_with_params(sql, [status, user_id]);
          let formated_order_products: undefined[][] = []
          order_products.forEach( (order_product) => formated_order_products.push([
            order_product.product_id,
            order_product.quantity,
            result.rows[0].id
          ]));
          const inserted_order_products= await db_query(
            format('INSERT INTO order_products (product_id, quantity, order_id) VALUES %L',formated_order_products))
          return inserted_order_products.rows
        } catch (err) {
          throw new Error(`Could not create order. Error: ${err}`)
        }
    }
}