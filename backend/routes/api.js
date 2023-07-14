import express from 'express'
import { publicAddMessage} from '../controllers/contactUsController.js';

const router = express.Router();

//public/contact-us/add
router.route('/add').post(publicAddMessage);

export default router;