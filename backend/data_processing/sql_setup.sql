-- create a database

CREATE DATABASE e_mechanic;
USE e_mechanic;
CREATE USER 'girum'@'localhost' IDENTIFIED BY '2315';
GRANT ALL PRIVILEGES ON e_mechanic.* TO 'girum'@'localhost';
FLUSH PRIVILEGES;

