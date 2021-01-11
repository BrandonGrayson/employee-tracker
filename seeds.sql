-- Patrick mahomes table data
Insert INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Patrick", "Mahomes", 1, 4)
Insert INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Lamar", "Jackson", 2, 5)
Insert INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Russell", "Wilson", 3, 6)

Insert INTO roles (title, salary, department_id)
VALUES("Accountant", 80000.00, 1);
Insert INTO roles (title, salary, department_id)
VALUES("Developer", 100000.00, 2);
Insert INTO roles (title, salary, department_id)
VALUES("Engineer", 90000.00, 3);

INSERT INTO department (name)
VALUES("OFFICE");
INSERT INTO department (name)
VALUES("Development");
INSERT INTO department (name)
VALUES("Engineering")