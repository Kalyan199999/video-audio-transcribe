const express = require('express');
const {
    get_link_audio,
    post_link_audio
} = require('../../controls/audio/audio-link-control')

const verify = require('../../middleware/verifyToken')
const router = express.Router();

router.get('/' ,   get_link_audio );

router.get('/:id', ()=>{

    return resizeBy.status(200).json({
        message: 'get link audio'
    })
    
} );

router.post('/',verify,post_link_audio);

module.exports = router;