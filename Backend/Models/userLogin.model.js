const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for users
let userLogin = new Schema({
    id:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    is_active: {
        type: Number
    },

}, {
    collection: 'user_login'
});

module.exports = mongoose.model('userLogin', userLogin);
