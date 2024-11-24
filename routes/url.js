const express = require('express')
const router = express.Router()
const {handledetail,handleget,handlepost} = require('../controllers/url')

router.post('/',handlepost)
router.get('/:ShortID',handleget)
router.get('/clicks/:ShortID',handledetail)


module.exports = router