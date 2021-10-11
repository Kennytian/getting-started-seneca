const Seneca = require('seneca');
const seneca = new Seneca();

// 监听 role:math 消息
// 重要：必须匹配客户端
seneca.use('math').listen({type: 'tcp', pin: 'role:math'});
