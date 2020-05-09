const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    
    Name:{

        type: String,
        required: true,
        trim: true


    },
    Price:{

        type: String,
        required: true,
        trim: true


    },
    Color:{

        type: String,
        required: true,
        trim: true


    },
    Discount:{

        type: String,
        required: true,
        trim: true


    },
    Qty:{

        type: String,
        required: true,
        trim: true


    },
    Category:{

        type: String,
        required: true,
        trim: true


    },
}, {
    timestamps:true,


});

const product = mongoose.model('product',productSchema);

module.exports = product;