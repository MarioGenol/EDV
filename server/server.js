import express from 'express';
import { getData, getDataDay, getDataID, getDataYear } from './database.js'

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', ['OPTIONS, GET, POST, PUT, DELETE']);

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
})

app.get('/data', async (req, res) => {
    const data = await getData();
    res.send(data);
})

app.get('/data/:id', async (req, res) => {
    const id = req.params.id;
    const data = await getDataID(id);
    res.send(data);
})

app.get('/data/:id/day/:day', async (req, res) => {
    const id = req.params.id;
    const day = req.params.day;
    const data = await getDataDay(id, day);
    res.send(data);
})

app.get('/data/:id/year/:year', async (req, res) => {
    const id = req.params.id;
    const year = req.params.year;
    const data = await getDataYear(id, year);
    res.send(data);
})

app.listen(4201, '127.0.0.1', function () {
    console.log('Server Listening in port 4201:');
})