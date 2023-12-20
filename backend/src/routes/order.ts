import express from 'express';
import { InsertGig,GetAllGigsOfSeller,editGig,getAllGigs } from '../controllers/gig';
import { verifyToken } from '../middleware/verifyToken';
import { intent } from '../controllers/order';

const router = express.Router();


router.post("/create-payment-intent/:id", verifyToken, intent);
export default router;





