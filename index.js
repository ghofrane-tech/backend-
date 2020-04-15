const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const path = require("path");
const Image = require("./model/Image");
const auth = require("./middleware/auth");
const User = require("./model/User");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");

//   next();
// });
// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "URLs to trust of allow");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   if ("OPTIONS" == req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
// Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   // res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

//image upload

app.use("/img", express.static("uploads"));
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ dest: __dirname + "/img", storage });

app.post("/uploadphoto", upload.single("photo"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;
  let img = new Image({
    title,
    description,
    image,
  });
 
  console.log("img");

  console.log(img);

  await img.save();
  //fichier html
  console.log("req.file.path");

  console.log(image);

  console.log("req");

  console.log(title);
  console.log(description);

  res.send({ message: "success" });
});

app.get("/images", async (req, res) => {
  let img = await Image.find();

  res.send(img);
});
app.patch("/image/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Image.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      console.log("error in upadting yo!");
      throw error;
    } else {
      console.log("updated yo");
      res.send(data);
    }
  });

  // res.send("success");
});

app.delete("/image/:id", (req, res) => {
  console.log(req.params.id);
  Image.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      console.log("error in deleting yo!");
      throw error;
    } else {
      console.log("data all gone and deleted yo");
      res.send({ message: "success" });
    }
  });
});

app.get("/image/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  res.send(user);
});
app.post("/image/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  user.images.push(req.body.image);
  // user.images = [];

  await User.findByIdAndUpdate(user._id, user);
  await res.send(user.images);
});
//

// Initiate Mongo Server
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
