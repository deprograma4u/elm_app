
DROP DATABASE IF EXISTS elm_db;
CREATE DATABASE IF NOT EXISTS elm_db;


DROP TABLE IF EXISTS elm_db.users;
CREATE TABLE IF NOT EXISTS elm_db.users(
    id  INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(99) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    location VARCHAR(99) NOT NULL,
    account_type VARCHAR(99) NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL
);


DROP TABLE IF EXISTS elm_db.listings;
CREATE TABLE IF NOT EXISTS elm_db.listings(
    id  INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(99) NOT NULL,
    owner VARCHAR(99) NOT NULL,
    price VARCHAR(15) NOT NULL,
    category VARCHAR(99) NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(99) NOT NULL,
    image TEXT NOT NULL,
    rate DECIMAL(5) NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS elm_db.bookings;
CREATE TABLE IF NOT EXISTS elm_db.bookings(
    id  INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(99) NOT NULL,
    price VARCHAR(15) NOT NULL,
    category VARCHAR(99) NOT NULL,
    status ENUM ('pending', 'completed') NOT NULL,
    image TEXT NOT NULL
);

