/**
 * Returns user's data by their login.
 * @param {string} login - Login of the user we want to get.
 * @param {array} users - An array of users.
 */
export default (login, users = []) => users[users.findIndex(user => user.login === login)]
