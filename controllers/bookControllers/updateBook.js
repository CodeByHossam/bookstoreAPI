const { Book, validateUpdateBook } = require("../../Models/Book");
const { Author } = require("../../Models/Author");

const updateBook = async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    if (req.body.auth) {
      const authorExists = await Author.findById(req.body.auth);
      if (!authorExists) {
        return res.status(400).json({ message: "Invalid author ID" });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book" });
  }
};

module.exports = updateBook;
