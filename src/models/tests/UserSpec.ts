import { UserModel } from '../user';
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const user = new UserModel(),
request = supertest(app)

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  it('create method should add a new user', async () => { 
    const result = await user.create("firstName", "lastName" ,"password")
    var compare_pass = bcrypt.compareSync("password"+process.env.BCRYPT_PASSWORD, result.password)
    expect(compare_pass).toEqual(true)
    expect(result).toEqual({
        id:6,
        firstname:"firstName",
        lastname: "lastName" ,
        password: result.password
    });
  })

});