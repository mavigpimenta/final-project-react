const mongoose = require('mongoose');
const { userSchema } = require('./user');
const { commentSchema } = require('./comment');

const postSchema = mongoose.Schema({
    comment: {
        type: [commentSchema],
        required: false
    },
    userId: {
        type: userSchema,
        required: true
    },
    title: {
        type: String,
        minlength: 6,
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

const Post = mongoose.model('Post', postSchema)

exports.Post = Post;
exports.postSchema = postSchema;