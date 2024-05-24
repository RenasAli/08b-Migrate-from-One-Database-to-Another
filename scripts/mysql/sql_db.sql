-- This script creates the database 'migrationdbsql' and initializes it with tables and data
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword';
flush privileges;
-- Create database
CREATE DATABASE IF NOT EXISTS migrationdbsql;

-- Use the created database
USE migrationdbsql;

-- Create 'user' table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100)
);

-- Create 'admin' table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Insert data into 'user' table
INSERT INTO user (username, password, email) VALUES
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com');

-- Insert data into 'admin' table
INSERT INTO admin (admin_name, role) VALUES
('admin1', 'superadmin'),
('admin2', 'moderator');
