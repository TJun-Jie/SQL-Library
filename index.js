const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const router = require('./routes/books');
const http = require('http');
const db = require('./models');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.set('port', process.env.PORT || 3000);

app.get('/' , (req, res) => {
    res.redirect('/books');
})
app.use('/books/' , router)

// 404 page not found error creater
app.use((req, res, next) => {
    const err = createError(404, 'Sorry, the page you are looking for does not exist')
    next(err);
})

// Global error handler
app.use( (err, req, res, next) => {
    // If error is not 404, return 500 error
    if (err.status !== 404){
        err.status = 500
        res.status(err.status);
        res.render('error', {err})
        console.log(err)
    } else {
        res.status(err.status);
        res.render('page-not-found')
        console.log(err)
    }
})


db.sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
  });