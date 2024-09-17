const mongoose = require('mongoose');
const { userSchema } = require('./user');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.ObjectId,
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
