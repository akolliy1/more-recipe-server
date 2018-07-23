import jwt from 'jsonwebtoken';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJiYWJha29sbGl5IiwiZW1haWwiOiJiYWJha29sbGl5QGdtYWlsLmNvbSIsImlhdCI6MTUzMjA0Njc3NiwiZXhwIjoxNTMyMDY4Mzc2fQ.qTYS4FmgmOhY3jQCuiF8qz_HD56rw_AmqHlNI9QyM0k;
/** This is basic authetication for route/controllers
 *@class auth
 *@returns { verification } - verifications success
 */
class auth {
  /** This is basic authetication for route/controllers
 *@param { * } req
 *@param { * } res
 *@param { * } next
 *@returns { object } - verifications success
 */
  static verify(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      const jwtSecret = process.env.JWT_SECRET;
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token'
          });
        }
        // token is working fine
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(406).json({
        success: false,
        message: 'Invalid authentication'
      });
    }
  }
}
export default auth;
