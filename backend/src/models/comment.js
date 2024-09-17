const mongoose = require('mongoose');
const { userSchema } = require('./user');
const { postSchema } = require('./post');

const commentSchema = new mongoose.Schema({
    posts: {
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

const Comment = mongoose.model('Comment', commentSchema);

exports.Comment = Comment;
exports.commentSchema = commentSchema;
