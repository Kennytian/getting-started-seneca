const Seneca = require('seneca');
const seneca = new Seneca();

seneca.use('basic').use('entity').use('book-store').listen({
    port: 9002,
    pin: 'role:store'
}).client({
    port: 9003,
    pint: 'role:store, info:purchase'
});
