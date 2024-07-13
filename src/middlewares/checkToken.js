import errors from "../utils/util.error.js"
import JWT from "../utils/util.JWT.js"
import Staffs from "../model/staffs.js"

export default async function (req, res, next) {
    try {
        let { token } = req.headers
        
        if (!token) {
            return next(
                new errors.AuthorizationError(400, 'User is un authorized')
            )
        }
        
        let staffs = await Staffs.find()
        const { staff_id, agent, ip } = JWT.verify(token)

        if (!(req.headers['user-agent'] == agent)) {
            return next(
                new errors.AuthorizationError(400, 'Token is invalid')
            )
        }

        if (!(req.headers['x-forwarded-for'] || req.socket.remoteAddress == ip)) {
            return next(
                new errors.AuthorizationError(400, 'Token is invalid')
            )
        }

        const staff = staffs.some(staff => staff._id == staff_id)

        if (!staff) {
            return next(
                new errors.AuthorizationError(400, 'The token invalid')
            )
        }


        req.user_id = staff_id

        next()
    } catch (error) {
        return next(
            new errors.AuthorizationError(400, error.message)
        )
    }
}