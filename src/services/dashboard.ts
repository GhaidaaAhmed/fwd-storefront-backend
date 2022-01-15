import { db_query_with_params } from '../database'

export class DashboardQueries {
  async getUserOrders(user_id:number): Promise<{id: Number, status: string,quantity: number}[]> {
    try {
        const sql = `SELECT orders.id, orders.status, order_products.quantity
        FROM orders
        JOIN order_products ON orders.id=order_products.order_id
        where orders.user_id = ($1) and status = 'active')`

        const result = await db_query_with_params(sql,[user_id])
        return result.rows
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    } 
  }
}