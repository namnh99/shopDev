const app = require('express')
const router = app.Router()

// Controller
const { getStatics, getMethods, createUser } = require('../controllers/user.controller')

router.get('/', (req, res) => {
  res.send({
    message: 'im ok'
  })
})
router.get('/getMethods', getMethods)
router.get('/getStatics', getStatics)
router.post('/createUser', createUser)

module.exports = router