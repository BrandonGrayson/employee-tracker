DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB

CREATE TABLE employee(
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT(45) NULL,
  PRIMARY KEY (first_name)
);

CREATE TABLE department(
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE position ( 
  id INT NOT NULL,
  salary decimal(30) NULL,
  department_id INT
  PRIMARY KEY (id)
);