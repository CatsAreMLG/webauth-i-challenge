const express = require('express')
const Users = require('../helpers/usersDb')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await Users.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error })
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.getUser(id)
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: 'User not found' })
  } catch (error) {
    res.status(500).json({ error })
  }
})
router.post('/', async (req, res) => {
  const { body } = req
  if (body && body.username && body.password)
    try {
      const id = await Users.addUser(body)
      res.status(201).json(id)
    } catch (error) {
      res.status(500).json({ error })
    }
  else res.status(500).json({ error: 'Please provide a description and notes' })
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Users.removeUser(id)
    deleted
      ? res.status(200).json(deleted)
      : res.status(404).json({ error: 'User not found' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
