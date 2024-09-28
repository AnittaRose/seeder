'use strict';

const language = require("../models/language");

module.exports = {
  up: (models, mongoose) => {

      return models.language.insertMany([
        {
         _id : "66f6e43f1461503a2581f882",
         language : "Malayalam"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {

      return models.language.deleteMany(
        {
          _id :{
            $in :[
              "66f6e43f1461503a2581f882"
            ]
          }
        }
      ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
