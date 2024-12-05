const mongoose = require("mongoose");

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
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 50,
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
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F035%2F857%2F779%2Fsmall_2x%2Fpeople-face-avatar-icon-cartoon-character-png.png&tbnid=Ntlb74PjSyik_M&vet=10CAgQxiAoCmoXChMI-Nnkqo-QigMVAAAAAB0AAAAAEA4..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fprofile&docid=M5OCFymUH1CGQM&w=400&h=400&itg=1&q=png%20profile%20picture&ved=0CAgQxiAoCmoXChMI-Nnkqo-QigMVAAAAAB0AAAAAEA4",
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
