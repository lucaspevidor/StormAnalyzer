const express = require('express');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/startPage/index.html');
})

router.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/pages/startPage/styles.css');
})

router.get('/luaScript.js', (req, res) => {
    res.sendFile(__dirname + '/pages/startPage/luaScript.js');
})

router.get('/res/logic.png', (req, res) => {
    res.sendFile(__dirname + '/pages/startPage/res/logic.png');
})

router.get('/addDataPoint', (req, res) => {
    const {x, d1, d2, d3, d4} = req.query;
    let { name } = req.query;

    if (!name) {
        res.status(400).json({error: 'Name is required'});
    }

    // Checks if name ends with .csv
    if (!name.endsWith('.csv')) {
        name = name + '.csv';
    }

    // Opens a csv file and appends the data points obtained above into it
    const writer = csvWriter({sendHeaders: false, separator: ';'});
    writer.pipe(fs.createWriteStream('data/' + name, {flags: 'a'}));
    writer.write({x, d1, d2, d3, d4});
    writer.end();

    res.json("OK");

});

module.exports = router;