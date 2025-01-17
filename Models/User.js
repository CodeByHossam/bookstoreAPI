const mongoose = require("mongoose");
const Joi = require("joi");

// MongoDB Schema for User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z0-9\s]+$/, // Allows alphabets, numbers, and spaces
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin:{
      type: Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);

// Joi Validation for Adding a New User
function validateNewUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z0-9\s]+$/) // Allows alphabets, numbers, and spaces
      .required()
      .messages({
        "string.pattern.base": "Name can only contain alphabets, numbers, and spaces.",
      }),
    email: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .email() // Validates email format
      .required()
      .messages({
        "string.email": "Please provide a valid email address.",
      }),
    password: Joi.string()
      .min(6) // Ensure password has at least 6 characters
      .required()
      .messages({
        "string.min": "Password must be at least 6 characters long.",
      }),

      isAdmin:Joi.boolean(),
  });

  return schema.validate(user);
}

// Joi Validation for Updating a User
function validateUpdateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z0-9\s]+$/) // Allows alphabets, numbers, and spaces
      .messages({
        "string.pattern.base": "Name can only contain alphabets, numbers, and spaces.",
      }),
    email: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .email()
      .messages({
        "string.email": "Please provide a valid email address.",
      }),
    password: Joi.string()
      .min(6)
      .messages({
        "string.min": "Password must be at least 6 characters long.",
      }),

    isAdmin:Joi.boolean(),

  }).min(1); // Ensure at least one field is provided

  return schema.validate(user);
}

// Validation function for login data recived by the client to express
function validateLoginData(userEnterdData) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long.",
    }),
  });
  return schema.validate(userEnterdData);
}
// MongoDB Model
const User = mongoose.model("User", userSchema);


module.exports = {
  User,
  validateNewUser,
  validateUpdateUser,
  validateLoginData,
};
