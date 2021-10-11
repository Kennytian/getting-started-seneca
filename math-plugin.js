const Seneca = require('seneca');
const seneca = new Seneca();

function math(options) {
    this.add('role:math, cmd:sum', function (msg, resp) {
        resp(null, {answer: msg.left + msg.right});
    });

    this.add('role:math, cmd:product', function (msg, resp) {
        resp(null, {answer: msg.left * msg.right});
    });
}

function output(err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result);
}


seneca.use(math).act('role:math, cmd:sum, left:1, right: 2', output);
