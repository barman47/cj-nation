const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const fileUpload = require('express-fileupload');

const { database_URI } = require('./config/keys');

const admin = require('./routes/api/admin');
const posts = require('./routes/api/posts');

const app = express();

const publicPath = path.resolve(__dirname, 'client', 'build');

const PORT = process.env.PORT || 5000;

mongoose.connect(database_URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true,
    useUnifiedTopology: true  
})
    .then(() => console.log('Database Connected!'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ createParentPath: true, preserveExtension: true, safeFileNames: true }));
app.use(express.static(publicPath));


app.use('/api/admin', admin);
app.use('/api/posts', posts);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
module.exports = { app };