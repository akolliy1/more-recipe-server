import jwt from 'jsonwebtoken';
/**
 * @description This is basic authetication for route/controllers
 * @class auth
 */
class Auth {
  /**
   * @description - Verify JWT token
   *
   * @method This
   *
   * @param {*} req
   *
   * @param {*} res
   *
   * @param {*} next
   *
   * @returns {object} this - class instance
   */
  verify(req, res, next) {
    const token = req.headers['x-access-token']
      || req.query.token
      || req.headers.token
      || req.body.token;

    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'No token provided'
      });
    }
    const jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token'
        });
      }
      if (decoded.exp < new Date().getTime() / 1000) {
        return res.status(401).json({
          success: false,
          message: 'Token has expired, please sign in again'
        });
      }
      // token is working fine
      req.decoded = decoded;
      next();
    });

    return this;
  }
}
export default Auth;
