const express = require('express');

const verify = require('../../middleware/verifyToken')

const {
    get_audio,
    get_audio_id
} = require('../../controls/audio/audio-get-control')

const router = express.Router();

router.get('/', verify, get_audio);

router.get('/:id', verify, get_audio_id);

module.exports = router;