import express from 'express'
import { addMessage, deleteMessage, findMessageById, listMessages, updateRead } from '../controllers/contactUsController.js';

const router = express.Router();
//api/contact-us/
router.route('/').get(listMessages);

//api/contact-us/add
router.route('/add').post(addMessage);

//api/contact-us/find
router.route('/find').post(findMessageById);

//api/contact-us/update-read
router.route('/update-read').put(updateRead);

//api/contact-us/delete
router.route('/delete').delete(deleteMessage);
export default router;