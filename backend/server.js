const express = require('express');
const cors = require('cors');

const app = express();

require('./src/startup/db')();

app.use(cors({
    origin: '*'
}));

require('./src/startup/routes')(app);

const port = 8000;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));