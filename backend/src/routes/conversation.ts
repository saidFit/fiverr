import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { HandleCoversation,GetAllOwnCov, getAllCoversationRequest, getAllMessageCov, InsertNewMessage } from '../controllers/conversation';

const router = express.Router();


router.post('/InsertCov',verifyToken,HandleCoversation)
router.get('/getAllOwnCoversation',verifyToken,getAllCoversationRequest)
router.get('/getAllConvMessages/:id',verifyToken,getAllMessageCov)
router.post('/sendMessage/:conversationId',verifyToken,InsertNewMessage)
export default router;





