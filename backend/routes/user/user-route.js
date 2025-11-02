const express = require('express');

const {
    register,
    getuserByEmail,
    getusers,
    login
} = require('../../controls/user/user-control')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/email/', getuserByEmail);
router.get('/', getusers);

module.exports = router;