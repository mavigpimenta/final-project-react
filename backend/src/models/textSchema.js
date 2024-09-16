const mongoose = require('mongoose');
const { postSchema } = require('./post');
const { userSchema } = require('./user');

const textSchema = new mongoose.Schema({
    comment: {
        type: String,
        minlength: 10,
        required: true
    },
    postId: {
        type: postSchema,
        required: true
    },
    userId: {
        type: userSchema,
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
});

exports.textSchema = textSchema;