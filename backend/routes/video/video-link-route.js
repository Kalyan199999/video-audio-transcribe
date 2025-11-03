const express = require('express');
const router = express.Router();

const verify = require('../../middleware/verifyToken')

const { get_link_video,  get_link_video_id , post_link_video } = require('../../controls/video/video-link-control');

router.get('/' ,  get_link_video);

router.get('/:id', get_link_video_id);

router.post('/',verify, post_link_video);

module.exports = router;