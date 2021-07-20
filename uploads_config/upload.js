const multer=require('multer');
//setting up multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage }).fields([{ name: 'img', maxCount: 1 }, { name: 'cimg', maxCount: 1 }]);

module.exports=upload;