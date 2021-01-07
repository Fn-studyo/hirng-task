const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
require('dotenv').config()

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json())

app.use(express.json())

app.get('/',(req,res) => {
    return res.status(200).send({
        message:'Welcome to Muritala David, hirng-x2021 Task 😋😎'
    });
});

require("../app/routes/api.routes.js")(app);

//protect api from external threat
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: "no-referrer" },
}))
console.log("Node Js is fun 😍");

app.listen(process.env.PORT||3000);