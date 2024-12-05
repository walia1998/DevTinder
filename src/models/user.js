const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error("Invalid email address: " + value)
        }
      }
    },

    password: {
      type: String,
      required: true,
      minLength: 8,

      validate(value) {
        if(!validator.isStrongPassword(value)) {
            throw new Error("Enter A stong Password: " + value)
        }
      }
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://example.com/default-profile.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Enter the Correct URL:" + value)
            }
        }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
