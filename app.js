const express = require('express');
const app = express();
const server = require('http').Server(app);

app.set('view engine', 'ejs');
app.use(express.static('viral'));

app.get('/', (req, res) => {
    res.render('home');
})


server.listen(process.env.PORT || 3030);




