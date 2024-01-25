
const mongoose = require("mongoose");

const HelloSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Hello = mongoose.model("Hello", HelloSchema);

module.exports = {
  Hello,
};
    
