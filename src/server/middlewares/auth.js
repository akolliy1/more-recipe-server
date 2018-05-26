/** This is basic authetication for route/controllers
 *@param { object } - req
 *@param { object } - res
 *@param { object } - next
 *@returns { object } - verifications success
 */
import jwt from "jsonwebtoken";

class auth {
    verify(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token) {
            const jwtSecret = process.env.JWT_SECRET;
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Failed to authenticate token'
                    })
                } else {
                    // token is working fine
                    req.decoded = decoded
                }
            })
        } else {
            return res.status(406).json({
                success: false,
                message: 'Invalid authentication'
            })
        }
    }
}
export default auth