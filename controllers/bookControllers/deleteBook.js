const { Book } = require("../../Models/Book");

const deleteBook = async (req, res) => {
  try {
    const bookToDelete = await Book.findByIdAndDelete(req.params.id);
    if (!bookToDelete) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      data: bookToDelete,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
};

module.exports = deleteBook;
