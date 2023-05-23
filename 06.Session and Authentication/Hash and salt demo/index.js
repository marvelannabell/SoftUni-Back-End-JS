const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const db = require('./db.json');//require parse js file in js object
const {registerUser}=require('./dataService')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //if use https: secure:true
}))

app.get('/login', (req, res) => {
    res.send(`
    <h1>Sign In</h1>
    <form action="" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="sign in">
    </form>
    `)
});

app.get('/', (req, res) => {
    res.send(
        `<h1>Hello</h1>
        <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/register">Register</a></li>

         </ul>

`    )
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'Ivan' && password === 'ivan') {
        const authData = {
            username: "Ivan",
        }
        res.cookie('auth', JSON.stringify(authData));
        req.session.username = 'Ivan'
        req.session.privateInfo = 'some info'
        return res.redirect('/');
    }

    res.status(401).end();
});

app.get('/register', (req, res) => {
    res.send(`  
    <h1>Sign Up</h1> 
    <form action="" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="sign up">
    </form>
    `)
});

app.post('/register',async (req, res) => {
    const { username, password } = req.body;
   await registerUser(username,password);
   res.redirect('/login');
});

app.get('/profile', (req, res) => {
    //check if user is logged
    const authData = req.cookies['auth'];
    if (!authData) {
        return res.status(401).end();
    }
    const { username } = JSON.parse(authData);

    console.log(req.session);

    res.send(`<h2>Hello-${username}</h2>`);

});

app.listen(5000, () => console.log("server 5000"));