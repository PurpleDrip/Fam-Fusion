const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  U_Name: { type: String, required: true },
  U_Email: { type: String, required: true },
  U_Password: { type: String, required: true },
});

module.exports = mongoose.model("User", User);
