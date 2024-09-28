'use strict';

const categories = require("../models/categories");

module.exports = {
  up: (models, mongoose) => {

      return models.categories.insertMany([
        {
          _id :"66f6dc1dad148d4b97746b08",
          categories:"horror"
 
        },
        {
          _id :"66f6def46db87f40ff839fc0",
          categories:"fantastic"
 
        },
        {
          _id :"66f6e2f66db87f40ff839fc3",
          categories:"Thriller"
 
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
  

      return models.categories.deleteMany({
        _id:{
          $in :[
            "66f6dc1dad148d4b97746b08",
            "66f6def46db87f40ff839fc0",
            "66f6e2f66db87f40ff839fc3"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  
  }
};
