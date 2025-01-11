const { Author, validateNewAuth } = require("../../Models/Author");

const updateAuthor = async (req, res) => {
  const { error } = validateNewAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          job: req.body.job,
        },
      },
      { new: true }
    );

    if (!updatedAuthor) return res.status(404).send("Author not found");

    res.status(200).send({
      message: "Author has been updated",
      data: updatedAuthor,
    });
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = updateAuthor;
