const mongoose = require("mongoose");
const Joi = require("joi");

// MongoDB Schema for Author with Timestamps
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/, // Only alphabets and spaces allowed
    },
    job: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z\s]+$/, // Only alphabets and spaces allowed
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Joi Validation for Adding a New Author
function validateNewAuth(obj) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Name can only contain alphabets and spaces.",
      }),
    job: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Job can only contain alphabets and spaces.",
      }),
  });

  return schema.validate(obj);
}

// Joi Validation for Updating an Author
function validateUpdateAuth(obj) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "Name can only contain alphabets and spaces.",
      }),
    job: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "Job can only contain alphabets and spaces.",
      }),
  }).min(1); // Ensure at least one field is provided

  return schema.validate(obj);
}

// MongoDB Model
const Author = mongoose.model("Author", authorSchema);

module.exports = { Author, validateNewAuth, validateUpdateAuth };
