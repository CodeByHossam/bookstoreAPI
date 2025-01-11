const mongoose = require("mongoose");
const Joi = require("joi");

/**
 * Mongoose schema for Book collection.
 */
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/, // Restricts to alphabets and spaces only
    },
    disc: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/, // Restricts to alphabets and spaces only
    },
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", // References the Author model
      required: true,
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

/**
 * Joi validation schema for validating new Book data.
 * @param {Object} book - The book object to validate.
 * @returns {Object} Joi validation result.
 */
function validateNewBook(book) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Name can only contain alphabets and spaces.",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name cannot exceed 50 characters.",
        "any.required": "Name is required.",
      }),

    disc: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Description can only contain alphabets and spaces.",
        "string.min": "Description must be at least 3 characters long.",
        "string.max": "Description cannot exceed 50 characters.",
        "any.required": "Description is required.",
      }),

    auth: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/) // Validates MongoDB ObjectId format
      .required()
      .messages({
        "string.pattern.base": "Invalid author ID format.",
        "any.required": "Author ID is required.",
      }),
  });

  return schema.validate(book);
}

/**
 * Joi validation schema for validating updates to a Book.
 * This allows partial updates, so fields can be updated individually.
 * @param {Object} book - The book object to validate (can contain partial data).
 * @returns {Object} Joi validation result.
 */
function validateUpdateBook(book) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "Name can only contain alphabets and spaces.",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name cannot exceed 50 characters.",
      }),

    disc: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "Description can only contain alphabets and spaces.",
        "string.min": "Description must be at least 3 characters long.",
        "string.max": "Description cannot exceed 50 characters.",
      }),

    auth: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid author ID format.",
      }),
  }).min(1); // Ensures at least one field is provided for an update

  return schema.validate(book);
}

// Create the Mongoose model for the Book collection
const Book = mongoose.model("Book", bookSchema);

module.exports = { Book, validateNewBook, validateUpdateBook };
