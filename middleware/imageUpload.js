const multer = require('multer');
const stor = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null,'image-'+new Date().toISOString().replace(/:/g, '-') + file.originalname);
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: stor,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

module.exports= upload;