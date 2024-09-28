const mongoose = require('mongoose');

const categories = new mongoose.Schema({

    categories : String,
})

module.exports = mongoose.model("categories",categories);