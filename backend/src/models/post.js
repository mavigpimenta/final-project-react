const mongoose = require('mongoose');
const { textSchema } = require('./textSchema');
const { userSchema } = require('./user');

const postSchema = new mongoose.Schema({
    comment: {
        type: [textSchema],
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