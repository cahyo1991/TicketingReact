// uploadMiddleware.js

const multer = require('multer');
const path = require('path');

var storage   = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "uploads/")
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.originalname.replace(/\s/g,''))
    }
})

const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

const upload = multer({
storage : storage,
file : fileFilter
//   limits: {
//     fileSize: 4 * 1024 * 1024,
//   }
});

module.exports = upload