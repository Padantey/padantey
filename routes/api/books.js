const express =require('express');
const router = express.Router();

// @route GET api/books/signin
// @desc 
// @access public
router.get('/signin',
(req,res)=>{
    res.json({msg: "Books Works!!"});
});


module.exports  = router;
