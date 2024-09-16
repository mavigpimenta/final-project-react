const mongoose = require('mongoose');
const { userSchema } = require('./user');

const textSchema = new mongoose.Schema({
    comment: {
        type: String,
        minlength: 10,
        required: false
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