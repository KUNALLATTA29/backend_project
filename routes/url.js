const express = require('express')
const {createurl, handlegetreq,handledetails} = require('../controllers/url')
const router = express.Router()

router.post('/',createurl)
router.get('/:shortId',handlegetreq)
router.get('/analytics/:shortId',handledetails)

module.exports = router