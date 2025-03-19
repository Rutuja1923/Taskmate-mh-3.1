const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkForAuthentication} = require('./middlewares/authMiddleware')

//Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/staticRoutes");

const PORT = 3000;
const app = express();

const {connectMongoDB} = require('./connection');
const url = process.env.MONGO_URI;
connectMongoDB(url);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(cookieParser());
app.use(checkForAuthentication);

//route register
app.use("/", homeRoutes);
app.use("/user", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});