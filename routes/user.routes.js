var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var userController = require('../controllers/user.controller');

router.get('/test', userController.test);
router.post('/signup', jsonParser, userController.signup);
router.post('/signin', jsonParser, userController.signin);

module.exports = router;
