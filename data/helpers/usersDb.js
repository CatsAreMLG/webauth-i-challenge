const db = require('../../dbConfig')

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
}

function getUsers() {
  return db('users')
}
function getUser(id) {
  return db('users')
    .where({ id })
    .first()
}
function addUser(body) {
  return db('users')
    .insert(body)
    .then(ids => ids[0])
}
function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(_ => {
      return getUser(id)
    })
}
function removeUser(id) {
  return db('users')
    .where({ id })
    .del()
}
