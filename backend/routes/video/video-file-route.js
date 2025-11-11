const express = require('express');

const verify = require('../../middleware/verifyToken')

const upload = require('../../multer/file_storage')

const {
    get_file_video,
    get_file_video_id,
    post_file_video
} = require('../../controls/video/video-file-control')

const router = express.Router();

router.get('/' ,  get_file_video );

router.get('/:id', get_file_video_id );

router.post('/',verify, upload.single('video') , post_file_video );

module.exports = router;