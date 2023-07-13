import express from 'express'
import { addMessage} from '../controllers/contactUsController.js';

const router = express.Router();
router.route('/add').post(addMessage);
export default router;