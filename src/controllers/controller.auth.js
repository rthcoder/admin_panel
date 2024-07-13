import fs from "fs"
import path from "path"
import sha256 from "sha256"
import Staff from "../model/staffs.js"
import JWT from "../utils/util.JWT.js"
import error from "../utils/util.error.js"

const LOGIN = async(req, res, next) => {
    try {

        let { username, password } = req.body
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const agent = req.headers['user-agent']

        username = username?.trim()
        password = password?.trim()

        if (!(username || password)) {
            return next(
                new error.ValidationError(400, "Input is required")
            )
        }

        const staff = await Staff.findOne({ username: username, password: sha256(password) }).populate('staff_role', 'role_title')

        if (!staff) {
            return next(
                new error.AuthorizationError(400, "Invalid username or password")
            )
        }

        return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The user successfully logged in!',
                    token: JWT.sign({ staff_id: staff._id, username, ip, agent }),
                    data: staff
                })
        
    } catch (error) {
        console.log(error.message);
        return next(error)
    }
}

export default {
    LOGIN
}