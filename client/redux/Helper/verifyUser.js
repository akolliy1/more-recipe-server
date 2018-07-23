import axios from 'axios';

/**
 * @function verifyUser
 *
 * @param {*} id userId
 *
 * @param {*} token token
 *
 * @returns {boolean} true
 */
const verifyUser = (id, token) => {
  axios.get(`/api/user/${id}/profile`, {
    headers: {
      token: `${token}`
    }
  })
    .then((res) => {
      const verified = res.data;
      const { success } = verified;
      if (success === true) {
        return true;
      }
    })
    .catch((/* error */) => false);
};

export default verifyUser;
