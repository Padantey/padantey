const express =require('express');
const router = express.Router();

// @route GET api/users/signin
// @desc 
// @access public
router.get('/signin',
(req,res)=>{
    res.json({msg: "Users Works!!"});
});


module.exports  = router;