const { fork } = require('child_process');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get("/:num", (req, res) => {
    const num = req.params.num;
    const child = fork("../app/src/static/js/child.js");
    child.send(num);
    child.on('message', (message) => {
        console.log(message);
        res.json(message);
    });
    child.on('error', (err) => {
        console.log(err);
    });
    child.on('exit', (code) => {
        console.log('child exited with code of ', code);
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));