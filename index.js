const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
  
const app = express();
app.set('view engine', 'ejs');
  
const port = process.env.PORT || 3001;
  
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
app.get('/', (req, res) => {
  req.flash('success', 'Welcome!!');
  res.redirect('/display-message');
});
  
app.get('/display-message', (req, res) => {
    res.render("display");
});

app.listen(port, (err) => {
  console.log('Server is up and listening on', port);
});