const express = require('express');
const app = express();
const morgan = require('morgan');
var sendFile = require('./routes/sendFile');
var registerCA = require('./routes/registerCommercialAdvisor');
//settings
app.set('port',process.env.PORT || 3000);
app.set('json spaces', 2);
//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//routes
app.use('/File',sendFile);
app.use('/Register',registerCA);
//Starting the server 
app.listen(app.get('port'),()=>{
    console.log( `Server on port ${app.get('port')}`);
});
