const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/elsewhere', (req,res,next) => {
    try{
        console.log(req.body);
        res.send(req.body);
    }catch(error){
        console.error(error);
    }


})

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'main.html'));
});

app.listen(PORT, () => {
  console.log('Listening on 5000');
});