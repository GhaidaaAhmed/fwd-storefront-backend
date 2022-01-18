import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const request = supertest(app)
let user_id: string | number, token:string =''

describe("User EndPoints", () => {

  it('should add a new user', async () => { 
    const result = await request.post('/users').send({
        firstName : "user",
        lastName: "last",
        password: "password"
    })
    token = result.body
    const compare_token = jwt.verify(token, process.env.TOKEN_SECRET as string)
    user_id = compare_token.user.id
    expect(compare_token.user).toEqual({
        id:5,
        firstname : "user",
        lastname: "last"
    })
  })

  it('should show user by id', async () => { 
    const result = await request.get(`/users/${user_id}`).set('Authorization', `Bearer ${token}`)
    var compare_pass = bcrypt.compareSync("password"+process.env.BCRYPT_PASSWORD, result.body.password)
    expect(compare_pass).toEqual(true)
    expect(result.body).toEqual({
        id: user_id,
        firstname:"user",
        lastname: "last" ,
        password: result.body.password
    });
  })

  it('show all users without valid token', async () => { 
    const result = await request.get(`/users`).set('Authorization', `InValidToken`)
    expect(result.status).toBe(401)
  })

});