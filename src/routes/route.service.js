import services from "../controllers/controller.service.js"
import { Router, request } from 'express'
import checkToken from "../middlewares/checkToken.js"

const router = Router()

router.get('/api/v1/service', checkToken, services.GET)
router.get('/api/v1/service/:id', checkToken, services.GET)
router.post('/api/v1/service', checkToken, services.POST)
router.put('/api/v1/service/:id', checkToken, services.PUT)
router.delete('/api/v1/service/:id', checkToken, services.DELETE)


export default router