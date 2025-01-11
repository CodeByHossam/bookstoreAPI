const { Author, validateNewAuth } = require("../../Models/Author");
const express=require("express")

const createAuthor = async (req, res) => {
  const { error } = validateNewAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newAuthor = new Author({
    name: req.body.name,
    job: req.body.job,
  });

  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).send({
      message: "New author has been created",
      data: savedAuthor,
    });
  } catch (error) {
    console.error("Error saving author:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = createAuthor;
