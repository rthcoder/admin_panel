import role from '../controllers/controller.role.js'
import { Router, request } from 'express'

const router = Router()

router.get('/api/v1/role', role.GET)
router.post('/api/v1/role', role.POST)
router.get('/api/v1/role/:id', role.GET)
router.put('/api/v1/role/:id', role.PUT)
router.delete('/api/v1/role/:id', role.DELETE)

export default router