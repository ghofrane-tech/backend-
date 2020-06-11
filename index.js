const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const path = require("path");
const Image = require("./model/Image");
const Video = require("./model/Video");
const Audio = require("./model/Audio");
const auth = require("./middleware/auth");
const User = require("./model/User");
//const {exec} = require("child_process");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());

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
const { exec } = require("child_process"); //npm install child_process

app.post("/show1", (req, res) => {
  // console.log(req.body.image);
  //  console.log(req.body.value)
  // console.log(req.body.x)
  // console.log(req.body.A)
  // console.log(req.body.B)
  // console.log(typeof req.body.B);
  // if (( req.body.C <0 ) || (req.body.G<0) || (req.body.C>24) || (req.body.G>24) )
  // {console.log("error")}
  var now = new Date();
  var jour    = now.getDate();
  var annee   = now.getFullYear();  
  var mois    = now.getMonth() + 1;
  var heure   = now.getHours();
  var minute  = now.getMinutes();
  var seconde = now.getSeconds();
  console.log(heure)
  console.log(minute)
  console.log(seconde)
  let s = "";
  for (let i = 0; i < req.body.image.length; i++) {
    s = s + " uploads/" + req.body.image[i];
  }
  let x = 0; //heure
  //  if (( req.body.C >0 ) && (req.body.G>0) && (req.body.C<24) && (req.body.G<24) )
  
  if (parseInt(req.body.C) < heure) {
    x = parseInt(req.body.C) - heure + 24;
  } else {
    x = parseInt(req.body.C) - heure;
    
    
  }
  

  let y = 0; // minute 
  // if (( req.body.D >0 ) && (req.body.H>0) && (req.body.D<60) && (req.body.H<60) )
  if ((parseInt(req.body.D) < minute) && (parseInt(req.body.D)<60)) 
   {
    y = parseInt(req.body.D) - minute + 60;
  } 
  if ((parseInt(req.body.D) > minute) && (parseInt(req.body.D)<60))
    {y = parseInt(req.body.D) - minute;
  }
  
  
  let z = 0;// date
  if (parseInt(req.body.B.substr(8, 2)) > jour ) {
    z = parseInt(req.body.B.substr(8, 2)) - jour;
  }
  if( (parseInt(req.body.B.substr(8, 2)) > jour ) && (parseInt(req.body.C) < heure))
           {z=parseInt(req.body.B.substr(8, 2)) - jour -1}
   console.log(req.body.B.substr(8, 2));
  if  ( (parseInt(req.body.D) < 60) && (parseInt(req.body.C) < 24)  && (parseInt(req.body.E)<2599)) {
  exec(
    "touch a.txt; sleep " +
      z +
      "d " +
      x +
      "h " +
      y +
      "m " +
      req.body.E +
      "s; sudo fbi -a --noverbose -T 1 -t " +
      req.body.A +
      s,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  }
  else console.log ("error")
  // alert("error");
});

//  app.get("/kill",(req, res) => {

//    exec("", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
// app.get("/show/:image",(req, res) => {
//   console.log(req.params.image);

//    exec("sudo fbi -a --noverbose -T 1 -t 10 uploads/"+req.params.image, (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
// });
// app.get("/show/:image/:temp",(req, res) => {

//   exec("sudo fbi -a --noverbose -T 1 -t "+req.params.temp +" uploads/"+req.params.image, (error, stdout, stderr) => {
//       if (error) {
//           console.log(`error: ${error.message}`);
//           return;
//       }
//       if (stderr) {
//           console.log(`stderr: ${stderr}`);
//           return;
//       }
//       console.log(`stdout: ${stdout}`);
//   });

//   });

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

// Initiate Mongo Server
InitiateMongoServer();

/**
 * Videos routings
 */
app.post("/uploadvideo", upload.single("video"), async (req, res) => {
  const { title, description } = req.body;
  const video = req.file.filename;
  let vid = new Video({
    title,
    description,
    video,
  });

  console.log("video");

  console.log(vid);

  await vid.save();
  //fichier html
  console.log("req.file.path");

  console.log(video);

  console.log("req");

  console.log(title);
  console.log(description);

  res.send({ message: "success" });
});

app.get("/videos", async (req, res) => {
  let img = await Video.find();

  res.send(img);
});
app.delete("/videos/:id", auth, (req, res) => {
  console.log(req.params.id);

  Video.findByIdAndDelete(req.params.id, async (error, data) => {
    if (error) {
      console.log("error in deleting yo!");

      throw error;
    } else {
      console.log("data all gone and deleted yo");
      let user = await User.findById(req.user.id);
      console.log(user.videos);
      user.videos = user.videos.filter((el) => el._id !== req.params.id);
      await User.findByIdAndUpdate(user._id, user);
      res.send({ message: "success" });
    }
  });
});

app.post("/video/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  user.videos.push(req.body.video);
  // user.images = [];

  await User.findByIdAndUpdate(user._id, user);
  await res.send(user.images);
});

app.get("/video/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  res.send(user);
});
// const { exec } = require("child_process"); //npm install child_process

app.post("/show2", (req, res) => {
  // console.log(req.body.image);
  //  console.log(req.body.value)
  // console.log(req.body.x)
  // console.log(req.body.A)
  // console.log(req.body.B)
  // console.log(typeof req.body.B);

  let s = "";
  for (let i = 0; i < req.body.video.length; i++) {
    s = s + " uploads/" + req.body.video[i];
  }
  let x = 0;
  if (parseInt(req.body.C) < parseInt(req.body.G)) {
    x = parseInt(req.body.C) - parseInt(req.body.G) + 24;
  } else {
    x = parseInt(req.body.C) - parseInt(req.body.G);
  }
  let y = 0;
  if (parseInt(req.body.D) < parseInt(req.body.H)) {
    y = parseInt(req.body.D) - parseInt(req.body.H) + 60;
  } else {
    y = parseInt(req.body.D) - parseInt(req.body.H);
  }

  let z = 0;
  if (parseInt(req.body.B.substr(8, 2)) > 19) {
    z = parseInt(req.body.B.substr(8, 2)) - 19;
  }

  console.log(req.body.B.substr(8, 2));

  exec(
    "touch a.txt; sleep 2s; omxplayer -b -t " +
      req.body.A +
      s,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
});



/**
 * End of videos routings
 */
app.post("/uploadaudio", upload.single("audio"), async (req, res) => {
  const { title, description } = req.body;
  const audio = req.file.filename;
  let aud = new Audio({
    title,
    description,
    audio,
  });

  // console.log("video");

  // console.log(vid);

  await aud.save();
  // //fichier html
  // console.log("req.file.path");

  // console.log(video);

  // console.log("req");

  // console.log(title);
  // console.log(description);

  res.send({ message: "success" });
});

app.get("/audios", async (req, res) => {
  let img = await Audio.find();

  res.send(img);
});
app.delete("/audios/:id", auth, (req, res) => {
  console.log(req.params.id);

  Audio.findByIdAndDelete(req.params.id, async (error, data) => {
    if (error) {
      console.log("error in deleting yo!");

      throw error;
    } else {
      console.log("data all gone and deleted yo");
      let user = await User.findById(req.user.id);
      console.log(user.audios);
      user.audios = user.audios.filter((el1) => el1._id !== req.params.id);
      await User.findByIdAndUpdate(user._id, user);
      res.send({ message: "success" });
      
    }
  });
});

app.post("/audio/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  user.audios.push(req.body.audio);
  // user.images = [];


  await User.findByIdAndUpdate(user._id, user);
  await res.send(user.images);
});

app.get("/audio/favorit", auth, async (req, res) => {
  let user = await User.findById(req.user.id);
  res.send(user);
});

// PORT
const PORT = process.env.PORT || 4000;

// Middleware

// app.use(function (req, res, next)
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
