const express = require('express');

const {
    get_file_video,
    get_file_video_id,
    post_file_video
} = require('../../controls/video/video-file-control')

const router = express.Router();

router.get('/' ,  get_file_video );

router.get('/:id', get_file_video_id );

router.post('/', post_file_video );

module.exports = router;