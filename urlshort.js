const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({

    shortId: {
        type: String,
        required: true,
        unique: true
    },

    longUrl: {
        type: String,
        required: true
    },

    accessCount: {
        type: Number,
        default: 0
    }
},
 { timestamps: true });

module.exports = mongoose.model("ShortUrl", shortUrlSchema);




