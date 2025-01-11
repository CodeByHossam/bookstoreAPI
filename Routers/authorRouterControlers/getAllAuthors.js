const { Author } = require("../../Models/Author");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).send(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = getAllAuthors;
