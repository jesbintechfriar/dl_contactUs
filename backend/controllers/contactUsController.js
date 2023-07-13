import asyncHandler from 'express-async-handler';
import addMessageRequest from '../requests/addMessageRequest.js';
import ContactUsRepository from '../repository/contactUsRepository.js';
import contactUsResource from '../resources/contactUsResources.js';
import FindMessageRequest from '../requests/findMessageRequest.js';
import UpdateReadRequest from '../requests/updateReadRequest.js';
import DeleteMessageRequest from '../requests/deleteMessageRequest.js';

const contactUsRepo = new ContactUsRepository();

/*
api/contact-us/add
parameters: name,email,phone,message
method: POST
response: _id,message
*/
const addMessage = asyncHandler(async (req, res) => {
    const { name, email, phone, message, country_code } = req.query;
    const messageRequest = new addMessageRequest({
        name,
        email,
        country_code,
        phone,
        message
    })
    try {
        const validatedData = await messageRequest.validate();
        const newMessage = await contactUsRepo.addMessage(validatedData);
        if (newMessage) {
            const messageResource = contactUsResource(newMessage);
            res.status(200).json({
                data: messageResource,
                message: "We will contact you soon"
            })
        }
        else {
            res.status(400);
            throw new Error("Unable to place request")
        }
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})




/*
api/contact-us/ 
parameters:
method: GET
response: list of messages(_id,name,email,phone,message,read,created_at,updated_at)
 */
const listMessages = asyncHandler(async (req, res) => {
    const messages = await contactUsRepo.listMessages();//select all documents from contactus collection
    if (messages) {
        res.status(200).json(messages)
    }
    else {
        res.status(400);
        throw new Error("Unable to get messages")
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
    const messageRequest = new FindMessageRequest({
        id
    });
    try {
        const validatedData = await messageRequest.validate();
        const message = await contactUsRepo.findMessage(validatedData);
        if (message) {
            res.status(200).json(message);
        }
        else {
            res.status(400);
            throw new Error("Unable to get message")
        }
    }
    catch (e) {
        res.status(400).json({ error: e.message });
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
    const messageRequest = new UpdateReadRequest({ id, status });
    try {
        const validatedData = await messageRequest.validate();
        const updatedData = await contactUsRepo.updateReadStatus(validatedData);
        if (updatedData) {
            res.status(200).json({
                message: `read status set to ${updatedData.read}`
            })
        }
        else {
            throw new Error("Unable to change read status")
        }
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})




/*
api/contact-us/delete
parameters: id
method: DELETE
response: id,message
*/
const deleteMessage = asyncHandler(async (req, res) => {
    const id = req.query.id;
    const messageRequest = new DeleteMessageRequest({
        id
    });
    try {
        const validatedData = await messageRequest.validate();
        const deleteMessage = await contactUsRepo.deleteMessage(validatedData);
        if (deleteMessage) {
            res.status(200).json({
                message: "Message deleted successfully"
            })
        }
        else {
            throw new Error("Unable to delete message")
        }
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})





/*
public/contact-us/add
parameters: name,email,phone,message
method: POST
response: _id,message
*/
const publicAddMessage = asyncHandler(async (req, res) => {
    const { name, email, phone, message, country_code } = req.query;
    const messageRequest = new addMessageRequest({
        name,
        email,
        country_code,
        phone,
        message
    })
    try {
        const validatedData = await messageRequest.validate();
        const newMessage = await contactUsRepo.addMessage(validatedData);
        if (newMessage) {
            const messageResource = contactUsResource(newMessage);
            res.status(200).json({
                data: messageResource,
                message: "We will contact you soon"
            })
        }
        else {
            res.status(400);
            throw new Error("Unable to place request")
        }
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})




export { listMessages, findMessageById, updateRead, deleteMessage, addMessage, publicAddMessage };