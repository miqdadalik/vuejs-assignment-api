var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String, required: true, max: 100
    },
    price: {
        type: Number, required: true
    },
    photo: {
        type: String
    },
    location: {
        type: String
    },
    availability: {
        type: String
    },
    fuelType: {
        type: String
    },
    transmission: {
        type: String
    },
    carType: {
        type: String
    },
    soldout: {
        type: Boolean
    }
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);
