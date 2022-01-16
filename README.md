# Storefront Backend Project

3 Models for store 
1- Product:
    You can add new Product 
    example:
    (POST) http://127.0.0.1:3000/products with authorization token
    will return the new added product
    Body: {
      name: 'new product',
      price: 250
    }

    You can show Product by id
    example:
    (GET) http://127.0.0.1:3000/products/product_id 
    will return the product with id (product_id)

    You can show all Products
    example:
    (GET) http://127.0.0.1:3000/products
    will return all products

2- User:
    You can add new User 
    example:
    (POST) http://127.0.0.1:3000/users
    Body: {
        firstname: "firstName",
        lastname: "lastName" ,
        password: "password"
    }
    will return the assigned token

    You can show user by id
    example:
    (GET) http://127.0.0.1:3000/users/user_id 
    will return the user with id (user_id)

    You can show all Users
    example:
    (GET) http://127.0.0.1:3000/users
    will return all users

3- Order:
    You can add new Order 
    example:
    (POST) http://127.0.0.1:3000/orders with authorization token
    will return the new added order
    Body: {
      status: 'active',
      user_id: 1
    }

    You can show Order by id
    example:
    (GET) http://127.0.0.1:3000/orders/order_id with authorization token
    will return the order with id (order_id)

    You can show all Orders
    example:
    (GET) http://127.0.0.1:3000/orders with authorization token
    will return all orders