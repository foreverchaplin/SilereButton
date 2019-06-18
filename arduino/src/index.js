const five = require('johnny-five');
const request = require('request');
const CronJob = require('cron').CronJob;

let board = new five.Board();
let ready = false;
let relay;
function inject() {
  this.repl.inject({ relay });
}

function toggle(light) {
  if (!ready) return;

  if (light) relay.on();
  else relay.off();

  inject();
}
const job = new CronJob('*/5 * * * * *', () => {
  request('https://silere-button.herokuapp.com/api/light', { json: true }, (err, res, { light }) => {
    if (err) { return console.log(err); }

    console.log('LIGHT = ', body.light);

    toggle(light);

    board.on('ready', () => {
      relay = new five.Relay(8);
      inject = inject.bind(this);
      ready = true;
    });
  });
});

job.start();
