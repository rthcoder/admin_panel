import partner from '../controllers/controller.partners.js'
import { Router, request } from 'express'
import checkToken from '../middlewares/checkToken.js'

const router = Router()

router.get('/api/v1/partners', checkToken, partner.GET)
router.get('/api/v1/partners/:id', checkToken, partner.GET)
router.post('/api/v1/partners', checkToken, partner.POST)
router.put('/api/v1/partners/:id', checkToken, partner.PUT)
router.delete('/api/v1/partners/:id', checkToken, partner.DELETE)

export default router