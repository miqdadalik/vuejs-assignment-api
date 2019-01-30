var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var productController = require('../controllers/product.controller');

router.get('/test', productController.test);


router.post('/create', jsonParser, productController.createProduct);

router.get('/', productController.allProducts);

router.put('/book/:id', jsonParser, productController.updateBooked);

router.get('/details/:id', productController.productDetails);

router.put('/update/:id', jsonParser,  productController.updateProduct);

router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;
