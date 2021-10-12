const stats = {};

const Seneca = require('seneca');
const seneca = new Seneca();

seneca.add('role:store, info:purchase', (msg, reply) => {
    const id = msg.purchase.bookId;
    stats[id] = stats[id] || 0;
    stats[id]++;
    console.log(stats);
    reply();
}).listen({port: 9003, pin: 'role:store, info:purchase'});
