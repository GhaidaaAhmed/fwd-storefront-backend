/**CREATE TYPE valid_status AS ENUM ('active', 'complete'); **/

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status VARCHAR(10) CHECK (status IN('active', 'complete'))
);