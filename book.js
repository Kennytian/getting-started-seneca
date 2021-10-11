const Seneca = require('seneca');
const seneca = new Seneca();

//需要 npm i seneca-entity -S
seneca.use('basic').use('entity');

const book = seneca.make('book');
book.title = 'Action in Seneca';
book.price = 9.99;

// 发送 role:entity,cmd:save,name:book 消息
book.save$((props, {id, title, price}) => {
    console.log('cb ====', id, title, price);
});
