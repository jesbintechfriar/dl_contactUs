import express from 'express'
import { publicAddMessage} from '../controllers/contactUsController.js';

const router = express.Router();
router.route('/add').post(publicAddMessage);
export default router;