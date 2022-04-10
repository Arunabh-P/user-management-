const router = require('express').Router()

const {registerUser,authUser} = require('../Controllers/AuthControllers')

router.post('/signup',registerUser)
router.post('/login',authUser)


module.exports =router;