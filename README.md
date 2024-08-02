## Introduction

### Welcome to __Urban-Resource-eCommerce-Market__, 

- Urban Resource is the all-in-one solution designed to enhance urban living through powerful and intuitive tools. This platform crafted with the __MERN stack__ (MongoDB, Express, React, Node.js).
-  This platform is designed to offer a seamless shopping experience with a modern user interface and powerful backend capabilities for managing urban resources and services.


## Project Structure

The project is organized into two main directories:

- `client`: This folder contains the frontend code.
- `api`: This folder contains the backend code.

## Installation

To get started with the project locally, follow these steps:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is included with Node.js. You can verify the installation by running the following command in your terminal:

```sh
  node -v
  npm -v
```

  - **MongoDB**: This project uses MongoDB as its database. You can download MongoDB from [https://www.mongodb.com]

## Clone repo
```sh
git clone https://github.com/arun-u-r/Urban-Resource-eCommerce-Market.git
```
## Navigate to the Project Directory

```sh
cd Urban-Resource-eCommerce-Market
```

## Install Dependencies
```sh
npm install
```

## Running the Application

To run the application, navigate to the project directory and execute the following commands:

- **Backend**: Navigate to the `api` directory and run the following command to start the server:

```sh
cd api
npm start
```


## Features

* User registration and authentication
* Product listing and search functionality
* Product review and rating
* Order processing and history


## Contributing

welcome contributions! To get started, follow these steps:

1. **Fork the repository**
2. **Create a new branch for your feature**
3. **Make your changes and commit them**
4. **Push to your forked repository**
5. **Open a Pull Request**


## Acknowledgments

+ Node.js for the server-side environment
+ React for the frontend framework
+ Express for the backend framework
  
## **Set up environment variables**
Create a `.env` file in the root directory of your project and copy the contents of the `.env.example` file into it.
Replace the placeholder values with your actual configuration.
    
# .env.example

    PORT=5005
    NODE_ENV=development/production
    DB_LOCAL_URI=mongodb://localhost:27017/your_database
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_TIME=your_jwt_expire_time (7d)
    COOKIE_EXPIRES_TIME=7
    SMTP_HOST=your_smtp_host (smtp.example.com)
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_pass
    SMTP_FROM_NAME=YourAppName
    SMTP_FROM_EMAIL=noreply@yourapp.com
  

## Access the Application: 

Once the server is running, open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:5005` for the backend.

- __Have Fun__ _Amigo_

## License

This project is licensed under the MIT License.


