const five = require('johnny-five');
let board;

const request = require('request');
const CronJob = require('cron').CronJob;
const job = new CronJob('*/5 * * * * *', () => {
  if (!board) board = new five.Board();

  request('https://silere-button.herokuapp.com/api/light', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    console.log('LIGHT = ', body.light);

    board.on('ready', function() {
      const relay = new five.Relay(8);
      if (body.light) relay.off();
      else relay.off();

      this.repl.inject({
        relay: relay
      });
    });
  });
});

job.start();
