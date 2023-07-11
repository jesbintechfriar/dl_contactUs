import express from 'express'
import { deleteMessage, findMessageById, insertMessage, listMessages, updateRead } from '../controllers/contactUsController.js';

const router = express.Router();
router.route('/').get(listMessages);
router.route('/insert').post(insertMessage);
router.route('/find').post(findMessageById);
router.route('/update-read').put(updateRead);
router.route('/delete').delete(deleteMessage);
export default router;