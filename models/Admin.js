const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: Buffer
    },

    role: {
        type: String,
        default: 'Admin'
    },

    dateCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = Admin = mongoose.model('admin', AdminSchema);