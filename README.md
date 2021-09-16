# flash-messages-node
Display Flash Messages using connect-flash Module in Node.js

Introduction

connect-flash module in nodejs allows the developers to send a message whenever a user is redirecting to a webpage. For Example when a use connect-flash r successfully logged in to an account, a message will be displayed like "You are logged in".

Following are the steps to installation and setup:
1. Initialize our application
2. Install dependencies
3. Implementation


<b>1. Initialize our application</b><br/>
to initialize our application, first create package.json using below command
<pre>
npm init
</pre>

<b>2. Install dependencies</b><br/>
install the dependencies that are required for our application by the following command:
<pre>
npm install express express-session connect-flash --save
</pre>
Here, express is required by the connect-flash library to run. We are using express-session so that a session can be created whenever a message is flashed and the user is redirected to the specified page.


<b>3. Implementation</b><br/>
create a file and name it as index.js. You can give any name of your choice. Now, open the index.js file and import the modules by the following code:
<pre>
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
  
const app = express();
</pre>
<br/>



Now, comes the main part that is implementation. Write the following code in index.js file:
<pre>
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
  
const app = express();
  
const port = process.env.PORT || 3001;
  
app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());
  
app.get('/', (req, res) => {
  req.flash('message', 'Welcome to Blog');
  res.redirect('/display-message');
});
  
app.get('/display-message', (req, res) => {
    res.send(req.flash('message'));
});
  
app.listen(port, (err) => {
  console.log('Server is up and listening on', port);
});
</pre>
<br/>

After importing all the required dependencies, we are defining a port number on which our app will run. Now, we are defining a session-secret by using which our sensitive information is encrypted. SaveUninitialized prevents the browser from using empty sessions. Now we are calling our connect-flash module by using app.use(flash()).

Now we define a route / , which will first flash(display) the specified message and then redirects the user to /display-message route.

The /display-message will show the specified message on the web-page. And, finally, we made our application to listen to the specified port.		

run the application by the following command:
<pre>
node index.js
</pre>
<br/>

Now we will display flash messages on the view file. For this we need to use the ejs view engine. to install ejs run the below command:
<pre>
npm install ejs
</pre>

and add below lines in index.js:
<pre>
app.set('view engine', 'ejs');
 
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});
</pre>
<br/>
Create views folder on root of the application and create display.ejs in this folder. Now render view template (display.ejs) in display-message route:
<pre>
app.get('/display-message', (req, res) => {
    res.render("display");
});
</pre>
<br/>

Add this line in views/index.js:
<pre>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" >
<% if(message.success){ %>
<div class="alert alert-success" role="alert">
    <%= message.success %>
</div>
<% } %>
</pre>

Restart the node server and open the below url in the browser.
http://localhost:3001/
