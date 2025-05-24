const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Added email pattern
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT token
userSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

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
        "string.pattern.base":
          "Name can only contain alphabets, numbers, and spaces.",
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

    isAdmin: Joi.boolean(),
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
        "string.pattern.base":
          "Name can only contain alphabets, numbers, and spaces.",
      }),
    email: Joi.string().trim().min(3).max(255).email().messages({
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().min(6).messages({
      "string.min": "Password must be at least 6 characters long.",
    }),

    isAdmin: Joi.boolean(),
  }).min(1); // Ensure at least one field is provided

  return schema.validate(user);
}

// Validation function for login data received by the client to express
function validateLoginData(userEnteredData) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long.",
    }),
  });
  return schema.validate(userEnteredData);
}

// Check if model exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = {
  User,
  validateNewUser,
  validateUpdateUser,
  validateLoginData,
};
