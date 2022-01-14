import dotenv from 'dotenv'
import { Pool, QueryResult } from 'pg'

dotenv.config()

const {POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env

export const Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

export const db_query_with_params =  async (sql: string, params:any) => {
    const conn = await Client.connect(),
    result = await conn.query(sql,params)
    conn.release()
    return result
}


export const db_query =  async (sql: string) => {
    const conn = await Client.connect(),
    result = await conn.query(sql)
    conn.release()
    return result
}
