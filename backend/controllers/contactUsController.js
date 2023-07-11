import asyncHandler from 'express-async-handler';
import ContactUs from '../models/contactUsModels.js';


/*
api/contact-us/insert
parameters: name,email,phone,message
method: POST
response: _id,message
*/
const insertMessage = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.query;
    const insert = await ContactUs.create({
        name: name,
        email: email,
        phone: phone,
        message: message,
    });
    if (insert) {
        res.status(200).json({
            _id: insert._id,
            message: `Hi ${insert.name} we will contact you soon`
        })
    }
    else {
        res.status(400);
        throw new Error("An error occured");
    }
})



/*
api/contact-us/ 
parameters:
method: GET
response: list of messages(_id,name,email,phone,message,read,created_at,updated_at)
 */
const listMessages = asyncHandler(async (req, res) => {
    const messages = await ContactUs.find();//select all documents from contactus collection
    if (messages) {
        res.status(200).json(messages)
    }
    else {
        res.status(400);
        throw new Error("Some error occured")
    }
})



/*
api/contact-us/find
parameters: id
method: POST
response: list of message(_id,name,email,phone,message,read,created_at,updated_at)
*/
const findMessageById = asyncHandler(async (req, res) => {
    const id = req.query.id;
    const message = await ContactUs.findOne({ _id: id });//select one document based on the id
    if (message) {
        res.status(200).json(message);
    }
    else {
        res.status(400);
        throw new Error("An error occured/Invalid Id");
    }
})



/*
api/contact-us/update-read
parameters: id
method: PUT
response: id,message
*/
const updateRead = asyncHandler(async (req, res) => {
    const { id, status } = req.query;
    const findMessage = await ContactUs.findOne({ _id: id }); //find one document based on id

    //check if the status is given or not
    if (status != undefined) { 
         //check if document available on the given id
        if (findMessage) { 
            findMessage.read = status;
            findMessage.updated_at = Date.now();
            const save = await findMessage.save();
            if (save) {
                res.status(200).json({
                    message: `read status set to ${status}`
                })
            }
            else {
                res.status(400);
                throw new Error("An error occured");
            }
        }
        else {
            res.status(400);
            throw new Error("Invalid Id")
        }
    }
    else {
        res.status(200).json({
            message: "status is required"
        })
    }
})




/*
api/contact-us/delete
parameters: id
method: DELETE
response: id,message
*/
const deleteMessage = asyncHandler(async (req,res)=>{
    const id = req.query.id;
    const findMessage = await ContactUs.findOne({ _id: id });//find one document based on the id

    //check if document available or not
    if (findMessage) {
        const deleteMessage = await ContactUs.findOneAndDelete({_id:id});//find the document and delete 
        //check if document deleted or not
        if(deleteMessage){
            res.status(200).json({
                _id:deleteMessage.id,
                message:"Message deleted"
            })
        }
        else{
            res.status(400);
            throw new Error("An error occured")
        }
    }
    else{
        res.status(400);
        throw new Error("Invalid ID")
    }
})

export { insertMessage, listMessages, findMessageById, updateRead,deleteMessage };