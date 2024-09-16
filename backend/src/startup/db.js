const express = require('express');
const route= require('../src/routes/route');

module.exports = function(app) {
    app
    .use(express.json())
    .use('/api/route', route)
}
