const Seneca = require('seneca');
const seneca = new Seneca();

function output(err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result);
}

seneca.client().act('role:math, cmd:sum, left:1, right: 2', output);
