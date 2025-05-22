const express = require("express");
const router = express.Router();
const getAllAuthors = require("../controllers/authorControllers/getAllAuthors");
const getAuthorById = require("../controllers/authorControllers/getAuthorById");
const createAuthor = require("../controllers/authorControllers/createAuthor");
const updateAuthor = require("../controllers/authorControllers/updateAuthor");
const deleteAuthor = require("../controllers/authorControllers/deleteAuthor");

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
