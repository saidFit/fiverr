import express from 'express';
import { InsertGig,GetAllGigsOfSeller,editGig,getAllGigs, EditReview } from '../controllers/gig';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();


router.post('/insert',verifyToken,InsertGig);
router.get('/getGigs',verifyToken,GetAllGigsOfSeller);
router.put('/putGig/:id',verifyToken,editGig);
router.get('/getAllGigs',getAllGigs);
router.put('/EditReview/:id',verifyToken,EditReview);
export default router;





