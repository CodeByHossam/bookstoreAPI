const {Book}=require("../../Models/Book")

const getAllBooks=async function (req, res){
    try {
      const allBooks = await Book.find().populate("auth", "name job"); // Populate author details
      res.status(200).json(allBooks);
    } catch (error) {
      handleServerError(res, error, "Error fetching books");
    }
  }

  module.exports=getAllBooks