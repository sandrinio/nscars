const express = require("express");
const app = express();

const  passport       = require("passport"),
			 bodyParser     = require("body-parser"),
			 flash          = require("connect-flash"),
			 session        = require("express-session"),
			 LocalStrategy  = require("passport-local"),
			 methodOverride = require("method-override"),
			 config 				= require('./config/config')
		   User           = require("./models/User");

const authRoutes      = require('./routes/Auth');
const landingRoutes   = require('./routes/Landing');

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(methodOverride("_method"));

app.use(authRoutes);
app.use(landingRoutes);

app.use(session({
	 secret: config.authentication.Secret,
	 resave: false,
	 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
	 res.locals.currentUser = req.user;
	 res.locals.error = req.flash("error");
	 res.locals.success = req.flash("success");
	 next();
});

/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში

app.listen(config.port, () => {  //if server is on
	 console.log(`Server ======STARTED====== on port ${config.port}`);
});