const express = require('express');
const path = require('path');
const fs = require('fs');

express()
  .use(express.static(path.join(__dirname, '../../client/build')))
  .get('/api/light', (req, res) => {
    let jsonData = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    let db = JSON.parse(jsonData);

    console.log('LIGHT = ', db.light);

    res.send({ light: db.light });
  })
  .post('/api/toggle', (req, res) => {
    let jsonData = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    let db = JSON.parse(jsonData);

    console.log('TOGGLE = ', db.light);

    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ light: !db.light }),
      (err) => {
        if (err) throw err;

        res.send('ok');
      }
    );
  })
  .get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/build/index.html')))
  .listen(process.env.PORT || 8000, () => console.log(`Listening on port ${process.env.PORT || 8000}`));