import express from 'express';
import { SaveDataController } from '../controllers/saveData.controller';

const router = express.Router();
const saveDataController = new SaveDataController();

// Save user data
router.post('/save/:userId', saveDataController.handleSaveUserData.bind(saveDataController));

// Load user data
router.get('/load/:userId', saveDataController.handleLoadUserData.bind(saveDataController));

export default router;
