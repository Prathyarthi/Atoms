import express from 'express'
import { createCommunity, deleteCommunity, getCommunities } from '../controller/communityController.js'
import { authorizeRoles, jwtAuth } from '../middleware/jwtAuth.js'

const router = express.Router()

router.post('/createCommunity', jwtAuth, authorizeRoles('ADMIN'), createCommunity)
router.get('/getCommunities', getCommunities)
router.delete('/deleteCommunity/:id', jwtAuth, authorizeRoles('ADMIN'), deleteCommunity)

export default router