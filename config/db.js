const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI =
 "mongodb+srv://redboudraa:test1234@cluster0-klfli.mongodb.net/test?retryWrites=true&w=majority" ;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
