## DataBase Schema
#### products
- id (serial)
- name (VARCHAR(100))
- price (number)

#### users
- id (serial)
- firstName (VARCHAR(100))
- lastName (VARCHAR(100))
- password (VARCHAR)

#### orders
- id (serial)
- user_id (string[foreign key to users table])
- status of order (VARCHAR(10) in 'active' or 'complete')

#### order_products
- id (serial)
- product_id (string[foreign key to products table])
- quantity (number)

## API Endpoints

## Products

| HTTP request  |     Path      |     args      |   JWT token   |
| ------------- |:-------------:|:-------------:|:-------------:|
|    GET        | /products     | -|-|
|    GET        | /products/product_id    | product_id |-|
|    POST       | /products     | name(string), price(number)|required  |


## Users

| HTTP request  |     Path      |     args      |   JWT token   |
| ------------- |:-------------:|:-------------:|:-------------:|
|    GET        | /users     | -|  required  |
|    GET        | /users/user_id    | user_id |  required  |
|    POST       | /users     | firstName(string), lastName(string) ,password(string) |  -  |

## Orders

| HTTP request  |     Path      |     args      |   JWT token   |
| ------------- |:-------------:|:-------------:|:-------------:|
|    POST       | /orders     | user_id[foreign key to users table],product_id [foreign key to products table],status(string), quantity(number) |   required  |

## Dashboard

| HTTP request  |     Path      |     args      |   JWT token   |
| ------------- |:-------------:|:-------------:|:-------------:|
|    GET        | /users/user_id/orders    | user_id|  required  |