const Seneca = require('seneca');
const seneca = new Seneca();

seneca
    // 本地模式
    .add('say:hello', (msg, reply) => reply(null, {text: 'Hi!'}))

    // 发送 role:math 模式至服务
    // 注意：必须匹配服务端
    .client({ type: 'tcp', pin: 'role:math' })

    // 远程操作
    .act('role:math,cmd:sum,left:1,right:2', console.log)

    // 本地操作
    .act('say:hello', console.log);
