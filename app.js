const express = require('express');
const app = express();
const server = require('http').Server(app);

app.set('view engine', 'ejs');
app.use(express.static('viral'));

app.get('/', (req, res) => {
    res.render('home');
})


server.listen(3030, () => console.log('server is up'));




