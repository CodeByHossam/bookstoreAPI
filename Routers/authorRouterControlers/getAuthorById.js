const { Author } = require("../../Models/Author");

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.status(200).send(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = getAuthorById;
