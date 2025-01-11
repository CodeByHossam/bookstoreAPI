const { Book } = require("../../Models/Book");

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("auth", "name job");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Error fetching book" });
  }
};

module.exports = getBookById;
