const mongoose = require('mongoose');

const urlScehma = new mongoose.Schema({
    url: {type: String}
});

const Url = mongoose.model("Url", urlScehma);
module.exports = Url;