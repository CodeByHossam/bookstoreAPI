const express = require("express");
const router = express.Router();
const getAllAuthors = require("./authorRouterControlers/getAllAuthors");
const getAuthorById = require("./authorRouterControlers/getAuthorById");
const createAuthor = require("./authorRouterControlers/createAuthor");
const updateAuthor = require("./authorRouterControlers/updateAuthor");
const deleteAuthor = require("./authorRouterControlers/deleteAuthor");

/**
 * @description Retrieve all authors
 * @method GET
 * @route /authors
 * @access Public
 */
router.get("/", getAllAuthors);

/**
 * @description Retrieve a specific author by ID
 * @method GET
 * @route /authors/:id
 * @access Public
 */
router.get("/:id", getAuthorById);

/**
 * @description Add a new author
 * @method POST
 * @route /authors
 * @access Public
 */
router.post("/", createAuthor);

/**
 * @description Update an existing author
 * @method PUT
 * @route /authors/:id
 * @access Public
 */
router.put("/:id", updateAuthor);

/**
 * @description Remove an author by ID
 * @method DELETE
 * @route /authors/:id
 * @access Public
 */
router.delete("/:id", deleteAuthor);

module.exports = router;
