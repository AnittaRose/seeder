const mongoose = require('mongoose');


const shows = new mongoose.Schema({
    title :{
        type : String
    },
    rating :{
        type :  Number
    },
    language :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "language"
    },
    categories :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "categories"
    },
    releasedDate :{
        type : String
    },
    image:{
        type:String
    }

})

module.exports =mongoose.model("shows",shows);
