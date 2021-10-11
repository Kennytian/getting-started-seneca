const Seneca = require('seneca');
const seneca = new Seneca();

seneca.add('role:math, cmd:sum', (msg, resp) => {
    resp(null, {answer: msg.left + msg.right});
}).act({role: 'math', cmd: 'sum', left: 1, right: 2}, (err, result) => {
    if (err) {
        return console.error(err);
    }
    console.log('1 + 2 = ', result);
}).act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, (err, result) => {
    if (err) {
        return console.error(err);
    }
    console.log('1.5 + 2.5 = ', result);
});
