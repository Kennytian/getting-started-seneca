const Seneca = require('seneca');
const seneca = new Seneca();

seneca.add('role:math, cmd:sum', (msg, resp) => {
    const answer = msg.left + msg.right;
    resp(null, {answer});
});

seneca.add('role:math, cmd:sum, integer:true', function (msg, resp) {
    // 复用 role:math, cmd:sum
    this.act({role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right)}, resp);
});

// 匹配 role:math,cmd:sum
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5', console.log)

// 匹配 role:math,cmd:sum,integer:true
seneca.act('role: math, cmd: sum, left: 1.5, right: 2.5, integer: true', console.log)
