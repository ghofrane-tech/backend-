const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
  video: {
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
module.exports = mongoose.model("Video", VideoSchema);
