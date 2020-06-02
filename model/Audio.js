const mongoose = require("mongoose");

const AudioSchema = mongoose.Schema({
  audio: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("Audio", AudioSchema);
