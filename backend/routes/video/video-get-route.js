const express = require('express');

const verify = require('../../middleware/verifyToken')
const {
    get_video,
    get_video_id
} = require('../../controls/video/video-get-control')

const router = express.Router();

router.post('/', verify, get_video);

router.get('/:id', verify, get_video_id);

module.exports = router;