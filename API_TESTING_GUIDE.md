# Book Store API Testing Guide

## Postman Setup

1. Create a new Collection: "Bookstore API Tests"
2. Set up Environment Variables:
   ```
   baseUrl: http://localhost:5000
   regularToken: (leave empty)
   adminToken: (leave empty)
   bookId: (leave empty)
   userId: (leave empty)
   ```

## Test Cases

### 1. User Registration Tests

#### 1.1 Regular User Registration

- **Method**: POST
- **URL**: {{baseUrl}}/user/register
- **Headers**: Content-Type: application/json
- **Body**:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "your_secure_password_here"
  }
  ```
- **Expected Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "isAdmin": false,
      "_id": "user_id_here"
    }
  }
  ```

#### 1.2 Admin User Registration (by Admin)

- **Method**: POST
- **URL**: {{baseUrl}}/user/register
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{adminToken}}
- **Body**:
  ```json
  {
    "name": "New Admin",
    "email": "newadmin@example.com",
    "password": "your_secure_admin_password_here",
    "isAdmin": true
  }
  ```
- **Expected Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "name": "New Admin",
      "email": "newadmin@example.com",
      "isAdmin": true,
      "_id": "admin_id_here"
    }
  }
  ```

#### 1.3 Regular User Registration (by Regular User)

- **Method**: POST
- **URL**: {{baseUrl}}/user/register
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{regularToken}}
- **Body**:
  ```json
  {
    "name": "Another User",
    "email": "another@example.com",
    "password": "your_secure_password_here"
  }
  ```
- **Expected Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "name": "Another User",
      "email": "another@example.com",
      "isAdmin": false,
      "_id": "user_id_here"
    }
  }
  ```

### 2. Authentication Tests

#### 2.1 Regular User Login

- **Method**: POST
- **URL**: {{baseUrl}}/user/login
- **Headers**: Content-Type: application/json
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "your_secure_password_here"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token_here",
      "user": {
        "name": "Test User",
        "email": "test@example.com",
        "isAdmin": false,
        "_id": "user_id_here"
      }
    }
  }
  ```

#### 2.2 Admin User Login

- **Method**: POST
- **URL**: {{baseUrl}}/user/login
- **Headers**: Content-Type: application/json
- **Body**:
  ```json
  {
    "email": "newadmin@example.com",
    "password": "your_secure_admin_password_here"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "token": "jwt_token_here",
      "user": {
        "name": "New Admin",
        "email": "newadmin@example.com",
        "isAdmin": true,
        "_id": "admin_id_here"
      }
    }
  }
  ```

### 3. Book Management Tests

#### 3.1 Add New Book (Admin)

- **Method**: POST
- **URL**: {{baseUrl}}/book/add
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{adminToken}}
- **Body**:
  ```json
  {
    "title": "Test Book",
    "author": "Test Author",
    "description": "Test Description",
    "price": 29.99,
    "category": "Fiction",
    "stock": 100
  }
  ```
- **Expected Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "title": "Test Book",
      "author": "Test Author",
      "description": "Test Description",
      "price": 29.99,
      "category": "Fiction",
      "stock": 100,
      "_id": "book_id_here"
    }
  }
  ```

#### 3.2 Get All Books

- **Method**: GET
- **URL**: {{baseUrl}}/book/all
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "title": "Test Book",
        "author": "Test Author",
        "description": "Test Description",
        "price": 29.99,
        "category": "Fiction",
        "stock": 100,
        "_id": "book_id_here"
      }
    ]
  }
  ```

### 4. User Management Tests

#### 4.1 Get User Profile

- **Method**: GET
- **URL**: {{baseUrl}}/user/profile
- **Headers**: Authorization: Bearer {{regularToken}}
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "isAdmin": false,
      "_id": "user_id_here"
    }
  }
  ```

#### 4.2 Update User Profile

- **Method**: PUT
- **URL**: {{baseUrl}}/user/profile
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{regularToken}}
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "name": "Updated Name",
      "email": "updated@example.com",
      "isAdmin": false,
      "_id": "user_id_here"
    }
  }
  ```

### 5. Password Management Tests

#### 5.1 Change Password

- **Method**: PUT
- **URL**: {{baseUrl}}/user/change-password
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{regularToken}}
- **Body**:
  ```json
  {
    "currentPassword": "your_secure_password_here",
    "newPassword": "new_secure_password_here"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "message": "Password updated successfully"
  }
  ```

### 6. Error Handling Tests

#### 6.1 Invalid Login

- **Method**: POST
- **URL**: {{baseUrl}}/user/login
- **Headers**: Content-Type: application/json
- **Body**:
  ```json
  {
    "email": "wrong@example.com",
    "password": "wrong_password"
  }
  ```
- **Expected Response (401)**:
  ```json
  {
    "success": false,
    "error": "Invalid credentials"
  }
  ```

#### 6.2 Unauthorized Access

- **Method**: POST
- **URL**: {{baseUrl}}/book/add
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{regularToken}}
- **Body**:
  ```json
  {
    "title": "Test Book",
    "author": "Test Author"
  }
  ```
- **Expected Response (403)**:
  ```json
  {
    "success": false,
    "error": "Access denied. Admin privileges required."
  }
  ```

### 7. Rate Limiting Tests

#### 7.1 Multiple Requests

- **Method**: GET
- **URL**: {{baseUrl}}/book/all
- **Expected Response (429)** after multiple requests:
  ```json
  {
    "success": false,
    "error": "Too many requests, please try again later."
  }
  ```

### 8. Security Tests

#### 8.1 Invalid Token

- **Method**: GET
- **URL**: {{baseUrl}}/user/profile
- **Headers**: Authorization: Bearer invalid_token
- **Expected Response (401)**:
  ```json
  {
    "success": false,
    "error": "Invalid token"
  }
  ```

### 9. Data Validation Tests

#### 9.1 Invalid Book Data

- **Method**: POST
- **URL**: {{baseUrl}}/book/add
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{adminToken}}
- **Body**:
  ```json
  {
    "title": "",
    "price": "invalid"
  }
  ```
- **Expected Response (400)**:
  ```json
  {
    "success": false,
    "error": "Validation error",
    "details": ["Title is required", "Price must be a number"]
  }
  ```

### 10. Performance Tests

#### 10.1 Bulk Book Creation

- **Method**: POST
- **URL**: {{baseUrl}}/book/bulk
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{adminToken}}
- **Body**: Array of 100 books
- **Expected Response (201)**:
  ```json
  {
    "success": true,
    "data": {
      "message": "100 books created successfully",
      "count": 100
    }
  }
  ```

### 11. Documentation Tests

#### 11.1 API Documentation Access

- **Method**: GET
- **URL**: {{baseUrl}}/docs
- **Expected Response (200)**: HTML documentation page

### 12. Integration Tests

#### 12.1 Complete User Flow

1. Register new user
2. Login with credentials
3. Update profile
4. Change password
5. Logout

- **Expected Flow**: All steps should complete successfully

### 13. Cleanup Tests

#### 13.1 Delete Test Data

- **Method**: DELETE
- **URL**: {{baseUrl}}/book/cleanup
- **Headers**: Authorization: Bearer {{adminToken}}
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "message": "Test data cleaned up successfully"
  }
  ```

### 14. Monitoring Tests

#### 14.1 Health Check

- **Method**: GET
- **URL**: {{baseUrl}}/health
- **Expected Response (200)**:
  ```json
  {
    "status": "healthy",
    "uptime": "2h 30m",
    "memory": "256MB"
  }
  ```

### 15. Maintenance Tests

#### 15.1 Database Backup

- **Method**: POST
- **URL**: {{baseUrl}}/admin/backup
- **Headers**: Authorization: Bearer {{adminToken}}
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "message": "Backup completed successfully",
    "backupId": "backup_123"
  }
  ```

### 16. Recovery Tests

#### 16.1 Restore from Backup

- **Method**: POST
- **URL**: {{baseUrl}}/admin/restore
- **Headers**: Authorization: Bearer {{adminToken}}
- **Body**:
  ```json
  {
    "backupId": "backup_123"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "message": "Restore completed successfully"
  }
  ```

### 17. Compliance Tests

#### 17.1 GDPR Data Export

- **Method**: GET
- **URL**: {{baseUrl}}/user/data
- **Headers**: Authorization: Bearer {{regularToken}}
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "userData": {
        "name": "Test User",
        "email": "test@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

### 18. Accessibility Tests

#### 18.1 API Version Check

- **Method**: GET
- **URL**: {{baseUrl}}/version
- **Expected Response (200)**:
  ```json
  {
    "version": "1.0.0",
    "compatibility": {
      "minVersion": "1.0.0",
      "maxVersion": "2.0.0"
    }
  }
  ```

### 19. Internationalization Tests

#### 19.1 Multi-language Support

- **Method**: GET
- **URL**: {{baseUrl}}/book/all
- **Headers**: Accept-Language: es
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "title": "Libro de Prueba",
        "author": "Autor de Prueba",
        "description": "Descripción de Prueba"
      }
    ]
  }
  ```

### 20. Future Compatibility Tests

#### 20.1 API Version Migration

- **Method**: POST
- **URL**: {{baseUrl}}/admin/migrate
- **Headers**: Authorization: Bearer {{adminToken}}
- **Body**:
  ```json
  {
    "targetVersion": "2.0.0"
  }
  ```
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "message": "Migration completed successfully",
    "newVersion": "2.0.0"
  }
  ```

#### 20.2 Backward Compatibility

- **Method**: GET
- **URL**: {{baseUrl}}/book/all
- **Headers**:
  - Accept: application/vnd.bookstore.v1+json
  - Authorization: Bearer {{regularToken}}
- **Expected Response (200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "title": "Test Book",
        "author": "Test Author",
        "description": "Test Description",
        "price": 29.99,
        "category": "Fiction",
        "stock": 100,
        "_id": "book_id_here"
      }
    ]
  }
  ```

## Test Execution Instructions

1. Set up your environment variables in Postman
2. Run tests in sequence as they may depend on previous test results
3. Save test data IDs (user_id, book_id) for subsequent tests
4. Clean up test data after completion
5. Document any failures or unexpected behavior

## Best Practices

1. Always use environment variables for sensitive data
2. Clean up test data after each test suite
3. Test both success and failure scenarios
4. Verify response status codes and data structures
5. Test rate limiting and security measures
6. Document any API changes that affect tests
