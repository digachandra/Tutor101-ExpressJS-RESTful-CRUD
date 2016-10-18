const express = require('express')
const router = express.Router()
const fruits = require('../controllers/fruits')

router.get('/fruits/', fruits.findAll)
router.get('/fruits/:id', fruits.findOne)
router.post('/fruits', fruits.createOne)
router.put('/fruits/:id', fruits.updateOne)
router.delete('/fruits/:id', fruits.deleteOne)

module.exports = router
