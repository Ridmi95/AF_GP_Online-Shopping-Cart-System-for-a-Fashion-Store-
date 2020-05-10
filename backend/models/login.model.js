// login.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Category
let loging = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    is_active: {
        type: Number
    }
}, {
    collection: 'login'
});

module.exports = mongoose.model('loging', loging);
