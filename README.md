# Book Store API

A robust RESTful API for an online bookstore built with Node.js, Express, and MongoDB.

[![GitHub](https://img.shields.io/github/license/CodeByHossam/bookstoreAPI)](https://github.com/CodeByHossam/bookstoreAPI/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/CodeByHossam/bookstoreAPI)](https://github.com/CodeByHossam/bookstoreAPI/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/CodeByHossam/bookstoreAPI)](https://github.com/CodeByHossam/bookstoreAPI/forks)

## Live Demo

- API Documentation: [https://book-store-api-6pr7.onrender.com/docs](https://book-store-api-6pr7.onrender.com/docs)
- API Base URL: [https://book-store-api-6pr7.onrender.com](https://book-store-api-6pr7.onrender.com)

## Features

### User Management

- User authentication system
  - User registration with validation
  - Secure login with JWT tokens
  - Password reset functionality via email
  - User profile management
  - Role-based access control (Admin/User)

### Book Management

- Complete book CRUD operations
  - Create new books with details
  - Retrieve books with author information
  - Update book information
  - Delete books from the system
- Book features
  - Author association
  - Input validation
  - Timestamp tracking

### Author Management

- Complete author CRUD operations
  - Add new authors with details
  - View author profiles and their books
  - Update author information
  - Remove authors from the system
- Author-specific features
  - Author-book relationships
  - Author details management

### Additional Features

- Image upload functionality
- Email notifications for password reset
- Secure API endpoints with JWT authentication
- Input validation using Joi
- Comprehensive error handling
- Detailed logging system
- CORS enabled
- Security headers with Helmet
- Database seeding with sample data

## Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Templating:** EJS
- **File Upload:** Multer
- **Email:** Nodemailer
- **Validation:** Joi
- **Security:** Helmet, CORS
- **Development:** Nodemon

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/CodeByHossam/bookstoreAPI.git
cd bookstoreAPI
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=your_frontend_url
```

4. Start the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Seeding

The application includes a database seeder that populates your database with sample data for testing and development.

### Sample Data

- 6 Famous Authors with detailed information
- 6 Classic Books with complete details
- 6 Users (1 admin + 5 regular users)

### Default Users

- **Admin User**

  - Email: admin@email.com
  - Password: 123456
  - Admin Status: Yes (isAdmin: true)

- **Regular Users**
  - John Doe (john@email.com)
  - Jane Smith (jane@email.com)
  - Bob Wilson (bob@email.com)
  - Alice Brown (alice@email.com)
  - Charlie Davis (charlie@email.com)
  - Password for all users: 123456

### How to Seed

```bash
node dataSeeder.js
```

## API Documentation

Visit the API documentation at:

- Local: [http://localhost:5000/docs](http://localhost:5000/docs)
- Production: [https://book-store-api-6pr7.onrender.com/docs](https://book-store-api-6pr7.onrender.com/docs)

## Project Structure

```
├── controllers/     # Route controllers
├── middleWares/    # Custom middleware
├── Models/         # Database models
├── Routers/        # API routes
├── views/          # EJS templates
├── public/         # Static files
├── config/         # Configuration files
├── app.js          # Main application file
└── dataSeeder.js   # Database seeder
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Helmet security headers
- Input validation
- Error handling
- CORS configuration
- Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

- **Hossam** - [CodeByHossam](https://github.com/CodeByHossam)

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
