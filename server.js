const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/urlshortener");

const Url = mongoose.model("Url", {

  shortId: String,
  longUrl: String,

  accessCount: {
    
    type: Number,
     default: 0
     }

});



app.post("/short", async (req, res) => {
  if (!req.body.longUrl) return res.send("URL required");

  const data = await Url.create({
    shortId: shortid.generate(),
    longUrl: req.body.longUrl
  });

  res.send(`http://localhost:5000/${data.shortId}`);
});

app.get("/:id", async (req, res) => {

  const url = await Url.findOneAndUpdate(
    { shortId: req.params.id },

    { $inc: { accessCount: 1 } },

    { new: true }
  );

  if (!url) return res.send("Not found");
  res.redirect(url.longUrl);
});

app.listen(5000, () => console.log("Server running"));

