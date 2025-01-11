const { Book, validateNewBook } = require("../../Models/Book");
const { Author } = require("../../Models/Author");

const createBook = async (req, res) => {
  const { error } = validateNewBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const authorExists = await Author.findById(req.body.auth);
    if (!authorExists) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const existingBook = await Book.findOne({ name: req.body.name, auth: req.body.auth });
    if (existingBook) {
      return res.status(400).json({ message: "This book already exists with the same author" });
    }

    const newBook = new Book({
      name: req.body.name,
      disc: req.body.disc,
      auth: req.body.auth,
    });

    await newBook.save();
    res.status(201).json({
      message: "New book created successfully",
      data: newBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book" });
  }
};

module.exports = createBook;
