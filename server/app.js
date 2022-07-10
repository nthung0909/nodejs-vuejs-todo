const express = require('express');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({extended: false}));
require('./routes/index')(app);

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});