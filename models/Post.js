const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'admins'
    },

    text: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    mimeType: {
        type: String,
        required: true
    },

    likes: [
        {
            userID: {
                type: String,
                required: true
            }
        }
    ],
    // likes: [
    //     {
    //         user: {
    //             type: Schema.Types.ObjectId,
    //             ref: 'users'
    //         }
    //     }
    // ],

    comments: [
        {
            user: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);