const express = require('express');
const path = require('path');
const fs = require('fs');

const db = require('../db/db.json');
const port = process.env.PORT || 3001;

express()
  .use(express.static(path.join(__dirname, '../../client/build')))
  .get('/api/light', (req, res) => {
    res.send({ light: db.light });
  })
  .post('/api/toggle', (req, res) => {
    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ light: !db.light }),
      (err) => {
        if (err) throw err;

        res.send('ok');
      }
    );
  })
  .get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../client/build/index.html')))
  .listen(port, () => console.log(`Listening on port ${port}`));