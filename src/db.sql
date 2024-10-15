
CREATE DATABASE employee_management_system;

USE employee_management_system;

CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  department_id INT,
  job_role VARCHAR(50),
  salary DECIMAL(10, 2),
  hire_date DATE,
  password VARCHAR(255)
);

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  manager_id INT
);

CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late', 'On Leave'),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE leaves (
  leave_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  leave_type VARCHAR(50),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('Pending', 'Approved', 'Rejected'),
  reason TEXT,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE performance_reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  review_date DATE NOT NULL,
  score INT,
  comments TEXT,
  reviewer_id INT,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE salaries (
  salary_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  pay_date DATE NOT NULL,
  basic_salary DECIMAL(10, 2),
  deductions DECIMAL(10, 2),
  bonuses DECIMAL(10, 2),
  net_salary DECIMAL(10, 2),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
