# Inventory Management System

## Overview  
An Inventory Management System (IMS) web application that allows users to track, manage, and maintain stock records, transactions, and product details. It provides a centralized interface for CRUD operations on items, categories, and inventory movements, making it easier to monitor stock levels, record purchases or sales, and generate basic reports.  

---

## Table of Contents  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Database Setup](#database-setup)  
  - [Running the App](#running-the-app)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## Features  
- Add, edit, delete products  
- Categorize products  
- Track inventory levels (stock in / stock out)  
- View transaction history  
- Search and filter products / transactions  
- Reports & analytics  

---

## Tech Stack  
- **Frontend**: React JS
- **Backend / Server**: PHP, XAMPP server
- **Database**: MySql  
- **Build Tools / Config**: Vite, ESLint, etc.  

---

## Getting Started  

### Prerequisites  
Make sure you have the following installed:  
- Node.js (version X or above)  
- npm / yarn  
- Database server (if using an external DB)  

### Installation  
1. Clone the repo  
   ```bash
   git clone https://github.com/froyd03/Inventory-Management-System.git

2. Go into the project directory 
   ```bash
   cd Inventory-Management-System

3. Install dependencies
   ```bash
   npm install

## Database Setup
1. Open the database.sql file and run it on your DB server to create the required tables and seed data
2. Adjust your DB connection settings (host, port, username, password) in the project’s config file (specify which file)

## Running the App
   ```bash
   npm run dev
