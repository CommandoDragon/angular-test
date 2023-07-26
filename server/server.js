const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyparser.json());

app.use(cors());

app.get('/', function(req, res){
    res.send('Hello From Server');
})

app.post('/bestel', function(req, res){
    console.log(req.body);
    res.status(200).send({"message": "Data recieved"})

})

app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT);
});