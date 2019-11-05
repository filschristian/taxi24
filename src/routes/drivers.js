import express from 'express';
import { driversController } from '../controllers';
import { validateIdParam, validateGetAllDrivers, validateLocation } from '../middlewares';

const router = express.Router();

router.get('/', validateGetAllDrivers, driversController.getAllDrivers);
router.get('/suggestions', validateLocation, driversController.getCloseDrivers);
router.get('/:id', validateIdParam, driversController.getDriverById);
export default router;
