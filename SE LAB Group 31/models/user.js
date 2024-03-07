const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_type: {
        type: String,
        required: true,
        enum : ['Manager','Clerk','Staff'],
        default: 'Manager'
    },
    joining_date: {
        type:Date,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
