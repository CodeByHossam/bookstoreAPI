const mongoose = require("mongoose");
const { Author } = require("./Models/Author");
const { Book } = require("./Models/Book");
const { User } = require("./Models/User");
const connectToDB = require("./config/dbConfig");
require("dotenv").config();

// Sample users data
const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: "123456",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "Jane Smith",
    email: "jane@email.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "Bob Wilson",
    email: "bob@email.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "Alice Brown",
    email: "alice@email.com",
    password: "123456",
    isAdmin: false,
  },
  {
    name: "Charlie Davis",
    email: "charlie@email.com",
    password: "123456",
    isAdmin: false,
  },
];

// Sample authors data
const authors = [
  {
    name: "J.K. Rowling",
    job: "Novelist",
    bio: "British author best known for the Harry Potter series",
    nationality: "British",
    birthYear: 1965,
  },
  {
    name: "George R.R. Martin",
    job: "Novelist",
    bio: "American novelist and short story writer, best known for A Song of Ice and Fire series",
    nationality: "American",
    birthYear: 1948,
  },
  {
    name: "Stephen King",
    job: "Author",
    bio: "American author of horror, supernatural fiction, suspense, and fantasy novels",
    nationality: "American",
    birthYear: 1947,
  },
  {
    name: "Agatha Christie",
    job: "Novelist",
    bio: "English writer known for her detective novels",
    nationality: "British",
    birthYear: 1890,
  },
  {
    name: "Ernest Hemingway",
    job: "Novelist",
    bio: "American novelist, short story writer, and journalist",
    nationality: "American",
    birthYear: 1899,
  },
  {
    name: "Jane Austen",
    job: "Novelist",
    bio: "English novelist known for romantic fiction",
    nationality: "British",
    birthYear: 1775,
  },
];

// Sample books data with explicit author assignments
const books = [
  {
    name: "Harry Potter and the Philosopher's Stone",
    disc: "The first book in the Harry Potter series",
    authorName: "J.K. Rowling",
    price: 19.99,
    isbn: "978-0747532743",
    publicationYear: 1997,
    genre: "Fantasy",
  },
  {
    name: "A Game of Thrones",
    disc: "The first book in A Song of Ice and Fire series",
    authorName: "George R.R. Martin",
    price: 24.99,
    isbn: "978-0553103540",
    publicationYear: 1996,
    genre: "Fantasy",
  },
  {
    name: "The Shining",
    disc: "A horror novel by Stephen King",
    authorName: "Stephen King",
    price: 17.99,
    isbn: "978-0385121675",
    publicationYear: 1977,
    genre: "Horror",
  },
  {
    name: "Murder on the Orient Express",
    disc: "A detective novel by Agatha Christie",
    authorName: "Agatha Christie",
    price: 14.99,
    isbn: "978-0062073495",
    publicationYear: 1934,
    genre: "Mystery",
  },
  {
    name: "The Old Man and the Sea",
    disc: "A novel by Ernest Hemingway",
    authorName: "Ernest Hemingway",
    price: 12.99,
    isbn: "978-0684801223",
    publicationYear: 1952,
    genre: "Fiction",
  },
  {
    name: "Pride and Prejudice",
    disc: "A romantic novel by Jane Austen",
    authorName: "Jane Austen",
    price: 9.99,
    isbn: "978-0141439518",
    publicationYear: 1813,
    genre: "Romance",
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to database
    await connectToDB();

    // Clean existing data
    console.log("🧹 Cleaning existing data...");
    await Author.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});

    // Create users
    console.log("👤 Creating users...");
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create authors
    console.log("👥 Creating authors...");
    const createdAuthors = await Author.create(authors);
    console.log(`✅ Created ${createdAuthors.length} authors`);

    // Create a map of author names to their IDs for easy lookup
    const authorMap = createdAuthors.reduce((map, author) => {
      map[author.name] = author._id;
      return map;
    }, {});

    // Update books with author references
    const updatedBooks = books.map((book) => {
      const { authorName, ...bookData } = book; // Remove authorName from book data
      return {
        ...bookData,
        auth: authorMap[authorName], // Use the author map to get the correct ID
      };
    });

    // Create books
    console.log("📚 Creating books...");
    const createdBooks = await Book.create(updatedBooks);
    console.log(`✅ Created ${createdBooks.length} books`);

    console.log("✨ Database seeding completed successfully!");
    console.log("\nDefault Users Created:");
    console.log("----------------------");
    console.log("Admin User:");
    console.log("Email: admin@email.com");
    console.log("Password: 123456");
    console.log("\nRegular Users:");
    console.log("Email: john@email.com, jane@email.com, bob@email.com");
    console.log("Email: alice@email.com, charlie@email.com");
    console.log("Password for all users: 123456");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
