import express from 'express';
import drivers from './drivers';
import riders from './riders';
import trips from './trips';

const router = express.Router();

router.use('/drivers', drivers);
router.use('/riders', riders);
router.use('/trips', trips);

export default router;
