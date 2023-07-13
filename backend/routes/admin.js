import express from 'express'
import { addMessage, deleteMessage, findMessageById, listMessages, updateRead } from '../controllers/contactUsController.js';

const router = express.Router();
router.route('/').get(listMessages);
router.route('/add').post(addMessage);
router.route('/find').post(findMessageById);
router.route('/update-read').put(updateRead);
router.route('/delete').delete(deleteMessage);
export default router;