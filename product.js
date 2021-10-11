const Seneca = require('seneca');
const seneca = new Seneca();

seneca.add('role:math, cmd:product', (msg, resp) => {
    resp(null, {answer: msg.left * msg.right});
});

seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, (err, result) => {
    if (err) {
        return console.error(err);
    }
    console.log(result);
});
