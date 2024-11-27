# Role-Based Access Control (RBAC) System
This is a Role-Based Access Control (RBAC) system designed to manage different levels of access for users based on their roles. The system allows admins to create and assign roles, manage permissions, and control access to different sections of the application based on user roles. It consists of a React frontend and a Node.js backend with MySQL for data storage.

## Features
Admin Login: Admins can log in and access the dashboard.

Role Management: Create, edit, and delete roles.

Permission Management: Manage permissions and assign them to roles.

User Management: Admin can add, edit, and delete users, assign them roles and permissions.

Protected Routes: Access to certain routes is controlled based on the user's role and permissions.

## Description
This project implements a Role-Based Access Control (RBAC) system where users are assigned roles, and each role is granted a specific set of permissions. This allows for better control over what a user can or cannot do within the system.

### Workflow:
Roles: Each user is assigned a role, e.g., Admin, Editor, Manager, etc.

Permissions: Permissions define what actions a user with a particular role can perform (e.g., View, Edit, Delete).

Access Control: The frontend uses role-based logic to allow or restrict access to different routes or components based on the role assigned to the user.

### Technologies Used:
Frontend: React, React Router, Bootstrap Icons

Backend: Node.js, Express

Database: MySQL

Authentication: JWT (JSON Web Tokens) for secure API authentication

Image Upload: Multer for handling file uploads

### Tools and Libraries Used:
React: For building the frontend user interface.

React Router: For routing and managing page navigation.

Axios: For making HTTP requests from the frontend to the backend.

Node.js: Backend server.

Express: A web framework for building the REST API.

MySQL: Database to store user, role, and permission data.

Multer: For handling file uploads (e.g., user images).

bcrypt: For hashing user passwords before storing them.

JWT: JSON Web Tokens for managing authentication and session.

## Steps to Clone and Run the Project:
Prerequisites:
Before running this project, ensure you have the following installed:

Node.js (v12 or higher)
MySQL (for the database)
npm (or yarn)

#### 1. Clone the Repository
To clone the project to your local machine, run the following command in your terminal:
```bash
git clone https://github.com/LaxmanPJ/role-based-access-control.git
```

#### 2. Install Dependencies
##### Backend

Navigate to the backend directory:

```bash
cd role-based-access-control/backend
```
##### Install the backend dependencies:

```bash
npm install
```
##### Set up the MySQL database:

Create a new database rbac_system.

Run the SQL scripts to create the necessary tables (Roles, Permissions, Users, etc.) by importing the provided .sql files or creating them manually as per the schema in the backend code.

##### Frontend
Navigate to the frontend directory:

```bash
cd ../frontend
```
##### Install the frontend dependencies:

```bash
npm install
```
#### 3. Run the Backend Server
Run the following command to start the backend server:

```bash
node index.js
```
This will start the backend server on http://localhost:5000.

#### 4. Run the Frontend
Open a new terminal, navigate to the frontend directory, and run:

```bash
npm start
```
This will start the frontend on http://localhost:3000.

#### 5. Access the Application
Visit the frontend application by opening http://localhost:3000 in your browser.

Use the login page to sign in as an admin (credentials should be preconfigured in the database).

### Database Structure
Tables:

#### admin:

id (Primary Key) |
email |
password

#### category (Roles Table):

id (Primary Key) |
name |
#### permission:

id (Primary Key) |
name
#### employee (User Table):

id (Primary Key) |
name |
email |
password |
address |
salary |
image |
category_id (Foreign Key - linked to category table) ||
permission_id (Foreign Key - linked to permission table)

### Example SQL Queries for Table Creation:
```bash
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE permission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    salary DECIMAL(10, 2),
    image VARCHAR(255),
    category_id INT,
    permission_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (permission_id) REFERENCES permission(id)
);
```

### Key Backend API Endpoints:
##### POST /adminlogin: 
Admin login to access the dashboard.

##### GET /category: 
Get a list of all roles (categories).
##### POST /add_category: 
Create a new role (category).
##### GET /permission: 
Get a list of all permissions.
POST /add_permission:
 Create a new permission.
##### GET /employee:
 Get all employee details.
##### POST /add_employee:
 Add a new employee (user) with role and permission.
##### PUT /edit_employee/:id:
 Edit employee details.
##### DELETE /delete_employee/:id:
 Delete an employee.

### Frontend Structure:
##### React Components:
##### AdminDashboard: 
Admin dashboard to manage roles, permissions, and users.
##### EmployeeDetail:
 Displays detailed information of a logged-in employee.
##### RoleManagement:
 Interface to manage roles (categories).
##### PermissionManagement:
 Interface to manage permissions.

'React Router' is used to navigate between different pages like Dashboard, Role Management, Permission Management, and Employee Management.


### Security Measures:
##### JWT Authentication:
 Used to authenticate admin users.
##### Password Hashing: 
Using bcrypt to securely hash passwords before storing them.
### Conclusion:
This system is designed to provide an easy and secure way of managing users and their access levels based on roles and permissions. You can easily extend this system by adding more roles, permissions, or additional functionalities.
