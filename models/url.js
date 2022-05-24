const mongoose = require('mongoose');
// DB schema
const urlSchema = new mongoose.Schema({
   url: {
      type: String,
      required: true
   },
   shortUrl: String,
   uniqueId: {
      type: String,
      unique: true
   } 
}, {
   timestamps: true
});

const URL = new mongoose.model("URL", urlSchema);

module.exports = URL;