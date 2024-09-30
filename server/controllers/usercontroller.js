const shows = require ('../db/models/users')
const { successfunction, errorfunction } = require('../util/responsehandler')
const fileUpload = require('../util/file-upload').fileUpload;

const language =require('../db/models/language');
const categories = require('../db/models/categories');

exports.createbooks = async function (req,res){
    try {
        let body =req.body;
        console.log('body',body);

        let image = req.body.image;
        console.log('image',image);


        let category =body.categories;
        console.log('category',category);

        let languages = body.language;
        console.log('languages',languages);

        let match = await categories.findOne({category : categories});
        console.log('match',match);

        let language_match = await language.findOne({languages : language});
        console.log('language_match',language_match);

        let language_id = language_match._id;

        let category_id = match._id;

        body.language= language_id
        body.categories=category_id

        let view = await shows.create(body);
        console.log('view',view);


        if(image) {
            let img_path =  await fileUpload(image,"users");
            console.log("img_path : ", img_path);
            body.image = img_path;
          }

        let response = successfunction({
            success : true,
            statuscode : 200,
            message : "successfully added...",
            // data : view
        })

        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log('error',error);
        let response = errorfunction({
            success : false,
            statuscode:400,
            message:'error'
        })

        res.status(response.statuscode).send(response);
    }
}

exports.viewbooks = async function(req,res){
    try {
        let section = await shows.find().populate('categories').populate('language')
        console.log('section',section);

        let response = successfunction({
            success : true,
            statuscode : 200,
            message : "successfully added...",
            data : section
        })

        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log('error',error);
        let response = errorfunction({
            success : false,
            statuscode:400,
            message:'error'
        })

        res.status(response.statuscode).send(response);
    }
}

exports.value = async function(req,res){

    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);

        let one_data = await shows.findOne({_id : single_id}).populate('categories').populate('language')
        console.log('one_data',one_data);

        let response = successfunction({
            success : true,
            statuscode : 200,
            message : "successfully added...",
            data : one_data
        })

        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log('error',error);
        let response = errorfunction({
            success : false,
            statuscode:400,
            message:'error'
        })

        res.status(response.statuscode).send(response);
    }
    
}

exports.delete = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await shows.deleteOne({_id : delete_id});
        console.log("delete_onedata :",delete_onedata)

        let response = successfunction({
            success : true,
            statuscode : 200,
            message : "Delete successfully...",
            // data : view
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log('error',error);
        let response = errorfunction({
            success : false,
            statuscode:400,
            message:'error'
        })

        res.status(response.statuscode).send(response);
    }
}

exports.edit = async function(req,res){
    try {
        let body = req.body;
        console.log('body',body);


        let id = req.params.id;

        
        let category =body.categories;
        console.log('category',category);

        let languages = body.language;
        console.log('languages',languages);

        let match = await categories.findOne({category : categories});
        console.log('match',match);

        let language_match = await language.findOne({languages : language});
        console.log('language_match',language_match);

        let language_id = language_match._id;

        let category_id = match._id;

        body.language= language_id
        body.categories=category_id




        let updatedata = await shows.updateOne({ _id : id }, { $set: body });
        console.log('updatedata',updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata',strupdatedata)

        let response = successfunction({
            success : true,
            statuscode : 200,
            message : "successfully updated...",
            // data : view
        })

        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log('error',error);
        let response = errorfunction({
            success : false,
            statuscode:400,
            message:'error'
        })

        res.status(response.statuscode).send(response);
    }
}


  


exports.filterdata = async function (req, res) {
    let query = req.query;

    if (query.categories && query.language) {
        try {
            let categories_filter = await categories.findOne({ categories: query.categories });
            console.log("categories_filter", categories_filter);

            let language_filter = await language.findOne({ language: query.language });
            console.log('language_filter', language_filter);

            let cate_id = categories_filter._id;
            console.log("cate_id", cate_id);

            let langu_id = language_filter._id;
            console.log("langu_id", langu_id);

            let match_id = await shows.find({ categories: cate_id, language: langu_id }).populate('language').populate('categories');
            console.log("match_id", match_id);

            let response = successfunction({
                success: true,
                statuscode: 200,
                message: "successfully filtered by both language and categories",
                data: match_id
            });

            res.status(response.statuscode).send(response);
            return;
        } catch (error) {
            console.log("error", error);
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "failed"
            });
            res.status(response.statuscode).send(response);
            return;
        }
    } else if (query.categories) {
        try {
            let categories_filter = await categories.findOne({ categories: query.categories });
            console.log("categories_filter", categories_filter);

            let id = categories_filter._id;
            console.log("id", id);

            let categories_match = await shows.find({ categories: id }).populate('categories');
            console.log('categories_match', categories_match);

            let response = successfunction({
                success: true,
                statuscode: 200,
                message: "successfully filtered categories",
                data: categories_match
            });

            res.status(response.statuscode).send(response);
            return;
        } catch (error) {
            console.log("error", error);
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "failed"
            });
            res.status(response.statuscode).send(response);
            return;
        }
    } else if (query.language) {
        try {
            let language_filter = await language.findOne({ language: query.language });
            console.log("language_filter", language_filter);

            let id = language_filter._id;
            console.log('id', id);

            let language_match = await shows.find({ language: id }).populate('language');
            console.log("language_match", language_match);

            let response = successfunction({
                success: true,
                statuscode: 200,
                message: "successfully filtered language",
                data: language_match
            });

            res.status(response.statuscode).send(response);
            return;
        } catch (error) {
            console.log("error", error);
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "failed"
            });
            res.status(response.statuscode).send(response);
            return;
        }
    }
};


     






