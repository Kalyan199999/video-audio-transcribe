const express = require('express');
const verify = require('../../middleware/verifyToken')
const router = express.Router();

router.get('/' ,   ()=>{
    
});

router.get('/:id', ()=>{
    
} );

router.post('/',verify, ()=>{
    
} );

module.exports = router;