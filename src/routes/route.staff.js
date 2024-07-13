import staff from "../controllers/controller.staff.js"
import { Router, request } from 'express'
import checkToken from "../middlewares/checkToken.js"

const router = Router()

router.get('/api/v1/staff', checkToken, staff.GET)
router.get('/api/v1/staff/:staffid', checkToken, staff.GET)
router.post('/api/v1/staff', checkToken, staff.POST)
router.put('/api/v1/staff/:id', checkToken, staff.PUT)
router.delete('/api/v1/staff/:id', checkToken, staff.DELETE)

export default router