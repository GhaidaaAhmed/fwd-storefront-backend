import { db_query, db_query_with_params} from "../database";

export type Product = {
    id: Number;
    name: string;
    price: number;
}
export class ProductStore{
    async index(): Promise<Product[]> {
        try {

          const sql = 'SELECT * FROM products'
          const result = await db_query(sql)
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get the products. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
            console.log(id)
          const sql = 'SELECT * FROM products WHERE id=($1)'
          const result = await db_query_with_params(sql, [id]);
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not find the product. Error: ${err}`)
        }
    }

    async create(name:string, price: number): Promise<Product> {
        try {
          const sql = 'INSERT INTO products (name, price) VALUES($1, $2)'
          const result = await db_query_with_params(sql, [name, price]);
          return result.rows[0]
        } catch (err) {
          throw new Error(`Could not create the product. Error: ${err}`)
        }
    }

}