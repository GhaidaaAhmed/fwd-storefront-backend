import { db_query, db_query_with_params} from "../database";
import bcrypt from 'bcrypt'

export type User = {
    id: Number;
    firstname: string;
    lastname: string;
    password: string;
}

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
} = process.env

export class UserModel{
    async index(): Promise<User[]> {
        try {
          const sql = 'SELECT * FROM users'
          const result = await db_query(sql)
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get the users. Error: ${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await db_query_with_params(sql, [id]);
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user. Error: ${err}`)
        }
    }

    async create(firstName:string, lastName: string, password: string): Promise<User> {
        try {
            const salt = SALT_ROUNDS? Number(SALT_ROUNDS) : 10
            const encrypted_password =  bcrypt.hashSync(password + BCRYPT_PASSWORD, salt);
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            const result = await db_query_with_params(sql, [firstName, lastName, encrypted_password]);
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create user. Error: ${err}`)
        }
    }

}