const express =require('express');
const router = express.Router();

router.get('/signin',
(req,res)=>{
    res.json({msg: "Books Works!!"});
});

module.exports  = router;