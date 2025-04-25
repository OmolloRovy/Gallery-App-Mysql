# 📸 Gallery App


A simple gallery project built with Node.js, React, and MySQL. This application demonstrates how users can store and display images directly from a MySQL database. 💾✨

## 🛠️ Tech Stack

* **Frontend:** React + TailwindCSS 🎨
* **Backend:** Node.js + Express 🚀
* **Database:** MySQL 🐬

## 🏃‍♂️ Run It Locally

Follow these steps to get the gallery app running on your local machine:

### 1️⃣ Create a Database

First, you need to create the MySQL database for the application. You can do this using a MySQL client or the command line:

```sql
CREATE DATABASE gallery;
```

### 2️⃣ Create a Table
Next, create the images table within the gallery database. This table will store the image file paths and creation timestamps:
```sql
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 3️⃣ Clone the Project
Clone the project repository from GitHub to your local machine:
```sql
gti clone https://github.com/OmolloRovy/Gallery-App-Mysql.git

```
### 4️⃣ Go to the Project Folder
Navigate to the main project directory:


