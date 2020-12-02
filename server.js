const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/www'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/www/index.html'));});
// app.listen(process.env.PORT || 8080);

let port = 20180;

app.listen(port,'0.0.0.0', ()=>{
   console.log(`App is running at the port ${port}`) ;
});