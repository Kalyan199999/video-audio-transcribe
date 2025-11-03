const express = require('express');
const verify = require('../../middleware/verifyToken')
const { get_audio , post_audio } = require('../../controls/audio/audio-file-control')

const upload = require('../../multer/file_storage')

const router = express.Router();

router.get( '/' , get_audio )

router.post( '/' ,verify, upload.single('audio') , post_audio )

module.exports = router