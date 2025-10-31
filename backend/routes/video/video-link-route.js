const express = require('express');
const router = express.Router();

const { get_link_video,  get_link_video_id , post_link_video } = require('../../controls/video/video-link-control');

// const upload = require('../multer/file_storage')

router.get('/' ,  get_link_video);

router.get('/:id', get_link_video_id);

router.post('/', post_link_video);

module.exports = router;