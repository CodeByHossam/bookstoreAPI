const mongoose = require("mongoose");
const { Author } = require("./Models/Author");
const { Book } = require("./Models/Book");
const { User } = require("./Models/User");
const connectToDB = require("./config/dbConfig");
require("dotenv").config();
const hashPassword = require("./middleWares/passwordHasher");

// Sample authors data
const authors = [
  {
    name: "J.K. Rowling",
    job: "Novelist",
  },
  {
    name: "George R.R. Martin",
    job: "Novelist",
  },
  {
    name: "Stephen King",
    job: "Author",
  },
  {
    name: "Agatha Christie",
    job: "Novelist",
  },
  {
    name: "Ernest Hemingway",
    job: "Novelist",
  },
  {
    name: "Jane Austen",
    job: "Novelist",
  },
];

// Sample books data
const books = [
  {
    name: "Harry Potter and the Philosopher's Stone",
    description: "The first book in the Harry Potter series",
    authorName: "J.K. Rowling",
  },
  {
    name: "A Game of Thrones",
    description: "The first book in A Song of Ice and Fire series",
    authorName: "George R.R. Martin",
  },
  {
    name: "The Shining",
    description: "A horror novel by Stephen King",
    authorName: "Stephen King",
  },
  {
    name: "Murder on the Orient Express",
    description: "A detective novel by Agatha Christie",
    authorName: "Agatha Christie",
  },
  {
    name: "The Old Man and the Sea",
    description: "A novel by Ernest Hemingway",
    authorName: "Ernest Hemingway",
  },
  {
    name: "Pride and Prejudice",
    description: "A romantic novel by Jane Austen",
    authorName: "Jane Austen",
  },
];

// Main seed function
async function seedDatabase() {
  try {
    // Validate environment variables
    if (!process.env.ADMIN_PASSWORD) {
      throw new Error(
        "ADMIN_PASSWORD is not set in .env file. Please set it before running the seeder."
      );
    }

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not set in .env file. Please set it before running the seeder."
      );
    }

    // Connect to DB
    console.log("🔌 Connecting to database...");
    await connectToDB();
    console.log("✅ Connected to database successfully");

    // Hash passwords
    console.log("🔒 Hashing passwords...");
    const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);
    const usersPassword = await hashPassword("123456");
    console.log("✅ Passwords hashed successfully");

    // Create users
    const users = [
      {
        name: "Admin",
        email: "admin@email.com",
        password: adminPassword,
        isAdmin: true,
      },
      {
        name: "John Doe",
        email: "john@email.com",
        password: usersPassword,
        isAdmin: false,
      },
      {
        name: "Jane Smith",
        email: "jane@email.com",
        password: usersPassword,
        isAdmin: false,
      },
      {
        name: "Bob Wilson",
        email: "bob@email.com",
        password: usersPassword,
        isAdmin: false,
      },
      {
        name: "Alice Brown",
        email: "alice@email.com",
        password: usersPassword,
        isAdmin: false,
      },
      {
        name: "Charlie Davis",
        email: "charlie@email.com",
        password: usersPassword,
        isAdmin: false,
      },
    ];

    // Clear collections
    console.log("\n🧹 Cleaning existing data...");
    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});
    console.log("✅ Collections cleaned successfully");

    // Insert users
    console.log("\n👤 Creating users...");
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert authors
    console.log("\n👥 Creating authors...");
    const createdAuthors = await Author.create(authors);
    console.log(`✅ Created ${createdAuthors.length} authors`);

    // Map author names to IDs
    const authorMap = createdAuthors.reduce((map, author) => {
      map[author.name] = author._id;
      return map;
    }, {});

    // Assign author ID to each book
    const updatedBooks = books.map((book) => {
      const { authorName, ...bookData } = book;
      const authorId = authorMap[authorName];
      if (!authorId) {
        throw new Error(`Author not found: ${authorName}`);
      }
      return {
        ...bookData,
        author: authorId,
      };
    });

    // Insert books
    console.log("\n📚 Creating books...");
    const createdBooks = await Book.create(updatedBooks);
    console.log(`✅ Created ${createdBooks.length} books`);

    // Summary
    console.log(`
✨ Database seeding completed successfully!

Default Users Created:
----------------------
Admin User:
Email: admin@email.com
Password: Set in .env file (ADMIN_PASSWORD)

Regular Users:
Email: john@email.com, jane@email.com, bob@email.com
Email: alice@email.com, charlie@email.com
Password for all users: 123456

Important Notes:
----------------
1. Make sure to keep your ADMIN_PASSWORD secure
2. Regular users' passwords should be changed in production
3. The admin user has full access to all features
4. Regular users have limited access based on permissions
`);

    process.exit(0);
  } catch (err) {
    console.error("\n❌ Error seeding database:");
    console.error(err.message);
    if (err.stack) {
      console.error("\nStack trace:");
      console.error(err.stack);
    }
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();

// Export seed function for testing
module.exports = seedDatabase;
