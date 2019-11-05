import express from 'express';
import { tripsController } from '../controllers';
import { validateTripBody, validateIdParam, validateCompleteTripBody } from '../middlewares';

const router = express.Router();

router.post('/', validateTripBody, tripsController.create);
router.get('/active', tripsController.getActiveTrips);
router.put('/:id/complete', validateIdParam, validateCompleteTripBody, tripsController.completeTrip);

export default router;
