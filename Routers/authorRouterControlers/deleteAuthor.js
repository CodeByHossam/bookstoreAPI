const { Author } = require("../../Models/Author");

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).send("Author not found");

    res.status(200).send({
      message: "Author has been deleted",
      data: deletedAuthor,
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = deleteAuthor;
