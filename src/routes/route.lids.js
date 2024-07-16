import lids from '../controllers/controller.lids.js'
import { Router, request } from 'express'
import checkToken from '../middlewares/checkToken.js'

const router = Router()

router.get('/api/v1/lids', checkToken, lids.GET)
router.post('/api/v1/lids', lids.POST)

export default router
