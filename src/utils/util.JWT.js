import JWT from 'jsonwebtoken'
console.log(process.env.JWT_SECRET);
export default {
    sign: payload => JWT.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d"
    }),
    verify: token => JWT.verify(token, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h"
    }),
}
