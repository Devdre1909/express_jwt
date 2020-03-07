let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);