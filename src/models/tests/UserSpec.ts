import { User, UserModel } from '../user';
import bcrypt from 'bcrypt'

const user = new UserModel()
let user_obj:User

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
    user_obj = await user.create("firstName", "lastName" ,"password")
    var compare_pass = bcrypt.compareSync("password"+process.env.BCRYPT_PASSWORD, user_obj.password)
    expect(compare_pass).toEqual(true)
    expect(user_obj).toEqual({
        id:6,
        firstname:"firstName",
        lastname: "lastName" ,
        password: user_obj.password
    });
  })

  it('show method should return user by id', async () => { 
    const result = await user.show(6)
    expect(result).toEqual(user_obj);
  })

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result.length).toEqual(6);
  });

});