const mongoose = require('mongoose');


const show = new mongoose.Schema({
    title :{
        type : String
    },
    rating :{
        type :  mongoose.Schema.Types.ObjectId,
        ref: "rating"
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

module.exports =mongoose.model("show",show);
