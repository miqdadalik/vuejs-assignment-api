var Product = require('../models/product.model');


exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createProduct = function (req, res,next) {
    console.log(req);
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            photo: req.body.photo,
            location: req.body.location,
            availability: req.body.availability,
            fuelType: req.body.fuelType,
            transmission: req.body.transmission,
            carType: req.body.carType
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.allProducts = function(req, res, next) {
    Product.find({}, function (err, products) {
        if (err) return next(err);
        
        var productArray = [];

        products.forEach(function(product) {
            productArray.push(product);
        });

        res.send(productArray);
    });
};

exports.updateBooked = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {soldout: req.body.soldout}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.productDetails = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.updateProduct = function (req, res, next) {
    console.log(req.params.id, req.body)
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.deleteProduct = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
