DROP DATABASE IF EXISTS easyShopDB; 

CREATE DATABASE easyShopDB;

USE easyShopDB;

CREATE TABLE products (item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(10 , 2 ),
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

-- Seed data for the DATABASE
INSERT INTO products
('product_name',
'department_name',
'price',
'stock_quantity') VALUES
("Frozen Cereal",
"Food",
2.50,
100),
("HuntMe",
"Toys and Games",
100,
20),
("Potato Chips",
"Food",
3.99,
999),
("Tennis Racquet",
"Sports",
59,
10),
("Swimming goggles",
"Sports",
8,
30),
("Luxilon Strings",
"Sports",
10,
99),
("Awesome Shampoo",
"Health and Beauty",
25.50,
7),
("Awesome Conditioner",
"Health and Beauty",
300,
25),
("World 500 piece puzzle",
"Toys and Games ",
35,
30),
("Coffee flavored straws",
"Food",
1000,
9.99);

CREATE TABLE orders(
  qty DECIMAL(10) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  product VARCHAR (80) NOT NULL
);

CREATE TABLE departments(
  department_id VARCHAR(5) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  overhead_cost DECIMAL (12) NOT NULL,
  PRIMARY KEY (department_id)
);

select * from products;