# FTS_SpringProjects_1

# SQL

```sql
-- 1. Create Schema and Use It
CREATE SCHEMA IF NOT EXISTS build_app;
USE build_app;

-- 2. Create Tables

-- Users Table
CREATE TABLE IF NOT EXISTS t_ecom_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(15),
    dob DATE,
    gender VARCHAR(10),
    state VARCHAR(100),
    created_at TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS t_ecom_products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    price DECIMAL(10, 2),
    stock INTEGER,
    created_at TIMESTAMP,
    category VARCHAR(100)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS t_ecom_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50),
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES t_ecom_users(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS t_ecom_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INTEGER,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES t_ecom_orders(id),
    FOREIGN KEY (product_id) REFERENCES t_ecom_products(id) ON DELETE CASCADE
);

-- Cart Table
CREATE TABLE IF NOT EXISTS t_ecom_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES t_ecom_users(id)
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS t_ecom_cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INTEGER,
    FOREIGN KEY (cart_id) REFERENCES t_ecom_cart(id),
    FOREIGN KEY (product_id) REFERENCES t_ecom_products(id) ON DELETE CASCADE
);

-- Address Table
CREATE TABLE IF NOT EXISTS t_ecom_address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user_address FOREIGN KEY (user_id) REFERENCES t_ecom_users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Admin Table
CREATE TABLE IF NOT EXISTS t_admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 3. Insert Sample Data

-- Admin
INSERT INTO t_admin (admin_id, password)
VALUES ('admin123', 'adminpass');

-- 4. Utility Queries

-- Show all data
SELECT * FROM t_ecom_users;
SELECT * FROM t_ecom_products;
SELECT * FROM t_ecom_orders;
SELECT * FROM t_ecom_order_items;
SELECT * FROM t_ecom_cart;
SELECT * FROM t_ecom_cart_items;
SELECT * FROM t_admin;
```
