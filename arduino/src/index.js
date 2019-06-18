const five = require('johnny-five');
const board = new five.Board();

const request = require('request');
/*
board.on('ready', function() {
  const led = new five.Relay(8);
  led.off();
});
*/

const CronJob = require('cron').CronJob;
const job = new CronJob('*/5 * * * * *', () => {
  console.log('Check back');
  request('http://localhost:3001/api/light', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    console.log('Light = ', body.light);
  });
});

job.start();
