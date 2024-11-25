const express = require('express')
const router = express.Router()
const {handledetail,handleget,handlepost,homepage} = require('../controllers/url')
const {authenticatetoken} = require('../middleware/auth')

router.get('/',authenticatetoken, homepage)
router.post('/',authenticatetoken ,handlepost)
router.get('/:ShortID',handleget)
router.get('/details/:ShortID',authenticatetoken, handledetail)


module.exports = router