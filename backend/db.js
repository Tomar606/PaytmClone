const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Tomar606:Indianrage14@paytm.y0ibvix.mongodb.net/")

const Schema = new Schema;

const userSchema = new Schema({
    firstName: { String,
        required: true
    },
    lastName: String,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: Number,
    mobileNo: Number,
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 30
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}