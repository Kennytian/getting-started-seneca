const Seneca = require('seneca');
const seneca = new Seneca();

seneca.add({role: 'math', cmd: 'sum'}, (msg, resp) => {
    resp(null, {answer: msg.left + msg.right});
});

// 下面两条消息都匹配 role: math, cmd: sum
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log);
seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log);

setTimeout(() => {
    seneca.add({role: 'math', cmd: 'sum', integer: true}, (msg, resp) => {
        resp(null, {answer: Math.floor(msg.left) + Math.floor(msg.right)});
    });

    // 下面这条消息同样匹配 role: math, cmd: sum
    seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5}, console.log);

    // 但是，也匹配 role:math,cmd:sum,integer:true
    // 但是因为更多属性被匹配到，所以，它的优先级更高
    seneca.act({role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true}, console.log);

}, 100);
