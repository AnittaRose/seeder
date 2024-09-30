'use strict';

const language = require("../models/language");

module.exports = {
  up: (models, mongoose) => {

      return models.language.insertMany([
        {
         _id : "66f6e43f1461503a2581f882",
         language : "Malayalam"
        },
        {
          _id : "66f7ae301ab25010cf47eff4",
          language : "English"
         },
         {
          _id : "66f7ae5a1ab25010cf47eff5",
          language : "Hindi"
         },
         {
          _id : "66f7ae771ab25010cf47eff6",
          language : "Tamil"
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
              "66f6e43f1461503a2581f882",
              "66f7ae301ab25010cf47eff4",
              "66f7ae5a1ab25010cf47eff5",
              "66f7ae771ab25010cf47eff6"
            ]
          }
        }
      ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
