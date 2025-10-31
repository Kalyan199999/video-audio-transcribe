const express = require('express');

const { get_audio , post_audio } = require('../../controls/audio/audio-file-control')

const upload = require('../../multer/file_storage')

const router = express.Router();

router.get( '/' , get_audio )

router.post( '/' , upload.single('audio') , post_audio )

module.exports = router