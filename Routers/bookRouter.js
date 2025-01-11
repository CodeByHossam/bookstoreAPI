const express = require("express");
const router = express.Router();
const getAllBooks = require("./bookRouterControlers/getAllBooks");
const getBookById = require("./bookRouterControlers/getBookById");
const createBook = require("./bookRouterControlers/createBook");
const updateBook = require("./bookRouterControlers/updateBook");
const deleteBook = require("./bookRouterControlers/deleteBook");

/**
 * @description Route to get all books
 * @method GET
 * @route "/books"
 * @access Public
 */
router.get("/", getAllBooks);

/**
 * @description Route to get a book by ID
 * @method GET
 * @route "/books/:id"
 * @access Public
 */
router.get("/:id", getBookById);

/**
 * @description Route to create a new book
 * @method POST
 * @route "/books"
 * @access Public
 */
router.post("/", createBook);

/**
 * @description Route to update a book by ID
 * @method PUT
 * @route "/books/:id"
 * @access Public
 */
router.put("/:id", updateBook);

/**
 * @description Route to delete a book by ID
 * @method DELETE
 * @route "/books/:id"
 * @access Public
 */
router.delete("/:id", deleteBook);

module.exports = router;
