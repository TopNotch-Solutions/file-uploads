const {Router} = require('express');
const fileController = require('../controllers/fileController');
const fileUpload = require('../middlewares/fileUpload');
const fileRouter = Router();

fileRouter.post('/create', fileController.create);

fileRouter.get('/all', fileController.all);
fileRouter.get('/single/:id', fileController.single);

module.exports = fileRouter;