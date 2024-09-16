const mongoose = require('mongoose');
const { postSchema } = require('./post');
const { userSchema } = require('./user');

const Comment = mongoose.model('Comment',
    new mongoose.Schema({
        postId: {
            type: postSchema,
            required: true
        },
        userId: {
            type: userSchema,
            required: true
        },
        description: {
            type: String,
            minlength: 6,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        },
        removedAt: {
            type: Date,
            required: false
        }
    })
)

exports.Comment = Comment;