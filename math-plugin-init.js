const {fsync, open, write} = require('fs');
const Seneca = require('seneca');
const seneca = new Seneca();

function math(options) {
    // 日志记录函数，通过 init 函数创建
    let log;

    function makeLog(fd) {
        return (entry) =>
            write(fd, `${new Date().toISOString()} ${entry}`, null, 'utf-8', (err) => {
                if (err) {
                    return console.error(err)
                }
                fsync(fd, (err1) => {
                    if (err1) {
                        return console.error(err1);
                    }
                })
            });
    }

    // 这就是那个特殊的初始化操作
    function init(msg, resp) {
        open(options.logfile, 'a', (err, fd) => {
            if (err) {
                return resp(err);
            }
            log = makeLog(fd);
            resp();
        });
    }

    function sum(msg, resp) {
        const out = {answer: msg.left + msg.right};
        log(`sum ${msg.left}+${msg.right}=${out.answer}\n`);
        resp(null, out);
    }

    function product(msg, resp) {
        const out = {answer: msg.left * msg.right};
        log(`product ${msg.left}*${msg.right}=${out.answer}\n`);
        resp(null, out);
    }

    this.add('init:math', init);

    // 将所有模式放在一起会上我们查找更方便
    this.add('role:math, cmd:sum', sum);
    this.add('role:math, cmd:product', product);
}

function output(err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result);
}


const arg1 = {logfile: './math.log'};
seneca.use(math, arg1).act('role:math, cmd:product, left:2, right:3', output);
