import mongoose from "mongoose";

// const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: String,
  email: String,
  message: String,
  timestamp: Date
});

const Message = mongoose.model('Message', messageSchema);

export default Message;