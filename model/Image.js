const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  image: {
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
  isChecked: {
    type: Boolean,
    
  },
});

// export model user with UserSchema
module.exports = mongoose.model("Image", ImageSchema);
