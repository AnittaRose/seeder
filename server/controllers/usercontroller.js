const show = require ('../db/models/users')
const { successfunction, errorfunction } = require('../util/responseHandler')
const fileUpload = require('../util/file-upload').fileUpload;

exports.createbooks = async function (req,res){
    try {
        let body =req.body;
        console.log('body',body);

        let image = req.body.image;
        console.log('image',image);

        let view= await show.create(body);
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
        let section = await show.find();
        console.log('section',section);

        if(section){
            res.status(200).json(section);
        }else{
            res.status(404).send('server error');
        }
    } catch (error) {
        console.log('error',error);
        
    }
}

exports.value = async function(req,res){

    let single_id = req.params.id;
    console.log('id from single',single_id);

    let one_data = await show.findOne({_id: single_id})
    console.log('one_data',one_data);


    if(one_data){
        res.status(200).send(one_data)
    }else{
        res.status(404).send('stringfy_data fetching fail');
    }
    
}

exports.delete = async function(req,res){
    try {
        let delete_id =req.params.id;
        console.log('delete_id',delete_id);

        let delete_onedata = await show.deleteOne({_id : delete_id});
        res.status(200).send(delete_onedata)
    } catch (error) {
        console.log('error',error)
    }
}

exports.edit = async function(req,res){
    try {
        let body = req.body;
        console.log('body',body);

    

        let id = req.params.id;

        let updatedata = await show.updateOne({ _id : id }, { $set: body });
        console.log('updatedata',updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata',strupdatedata)

        if(updatedata){
            res.status(200).send(strupdatedata)
        }else{
            res.status(400).send('update failed')
        }

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product'); 
    }
}


     






