// 使用 Node 内置的 `assert` 模块
const {equal, fail} = require('assert');

const Seneca = require('seneca');
const seneca = new Seneca();

seneca.use('basic').use('entity').use('book-store').client({
    port: 9003,
    pin: 'role:store, info:purchase'
}).error(fail);

function purchase(book) {
    seneca.act('role:store, cmd:purchase', {
        id: book.id,
    }, (err, pur) => {
        equal(pur.bookId, book.id);
    });
}

function addBook() {
    seneca.act('role:store, add:book, data:{title:Action in Seneca, price:9.99}', function (err, savedBook) {
        this.act('role:store, get:book', {id: savedBook.id}, function (err, loadedBook) {
            equal(loadedBook.title, savedBook.title);
            purchase(loadedBook);
        });
    });
}

addBook();
