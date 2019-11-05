import express from 'express';
import { ridersController } from '../controllers';
import { validateIdParam } from '../middlewares';


const router = express.Router();

router.get('/', ridersController.getAllRiders);
router.get('/:id', validateIdParam, ridersController.getRiderById);
router.get('/:id/closeDrivers', validateIdParam, ridersController.getCloseDrivers);

export default router;
