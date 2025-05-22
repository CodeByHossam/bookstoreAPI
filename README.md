# Online Bookstore API

A robust RESTful API for an online bookstore built with Node.js, Express, and MongoDB.

## Features

### User Management

- User authentication system
  - User registration with validation
  - Secure login with JWT tokens
  - Password reset functionality via email
  - User profile management
  - Role-based access control (Admin/User)

### Book Management

- Basic book CRUD operations
  - Create new books with name and description
  - Retrieve books with author details
  - Update book information
  - Delete books from the system
- Book features
  - Author association
  - Input validation for book details
  - Timestamp tracking (created/updated)

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
- Email notifications for:
  - Password reset
- Secure API endpoints with JWT authentication
- Input validation using Joi for all requests
- Comprehensive error handling middleware
- Detailed logging system for debugging
- CORS enabled for cross-origin requests
- Security headers with Helmet protection
- Database seeding with sample data

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- EJS for view templates
- Multer for file uploads
- Nodemailer for email functionality
- Joi for validation
- Helmet for security
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=your_frontend_url
```

4. Start the server

```bash
npm start
```

## Database Seeding

The application includes a database seeder that populates your database with sample data. This is useful for testing and development.

### Sample Data

The seeder includes:

- 6 Famous Authors with detailed information
- 6 Classic Books with complete details
- Proper relationships between authors and books

### How to Seed

To seed your database with sample data:

```bash
node dataSeeder.js
```

The seeder will:

1. Connect to your MongoDB database
2. Clean existing data (delete all authors and books)
3. Insert the sample authors
4. Create books with references to the authors

Expected output:

```
✅ Connected to database
✅ Database cleaned
✅ Authors seeded
✅ Books seeded
✅ Database seeding completed successfully
```

**Note:** Make sure your MongoDB connection string is properly set in your .env file before running the seeder.

## API Endpoints

### Authentication

- POST `/user/register` - Register a new user
- POST `/user/login` - Login user
- POST `/password/reset` - Request password reset
- POST `/password/reset/:token` - Reset password

### Books

- GET `/books` - Get all books
- GET `/books/:id` - Get a specific book
- POST `/books` - Create a new book
- PUT `/books/:id` - Update a book
- DELETE `/books/:id` - Delete a book

### Authors

- GET `/authors` - Get all authors
- GET `/authors/:id` - Get a specific author
- POST `/authors` - Create a new author
- PUT `/authors/:id` - Update an author
- DELETE `/authors/:id` - Delete an author

### Image Upload

- POST `/upload` - Upload an image

## Project Structure

```
├── controllers/     # Route controllers
├── middleWares/    # Custom middleware
├── Models/         # Database models
├── Routers/        # API routes
├── views/          # EJS templates
├── image/          # Uploaded images
├── app.js          # Main application file
├── dataSeeder.js   # Database seeder
└── config/         # Configuration files
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Helmet security headers
- Input validation
- Error handling
- CORS configuration
- Rate limiting

## License

ISC

## Author

Hossam
